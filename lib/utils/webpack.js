const path = require( 'path' );
const format = require( 'prettier-eslint' );
const { writeFile /*fileExists*/ } = require( './file.js' );

const getCommonConfig = ( rootPath, options ) => {
    const fileName = path.resolve( rootPath, 'webpack.common.js' );

    const config = `
        const path = require( 'path' );
        const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
        const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
        const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

        module.exports = {
            context : __dirname,
            target  : 'web',
            entry   : './${options.srcDir}/index.jsx',
            output : {
                filename        : 'js/${options.name}.js',
                chunkFilename   : 'js/${options.name}-[name]-[contenthash:6].js',
                path            : path.resolve( __dirname, 'dist' ),
                publicPath      : '/',
            },
            module : {
                rules : [
                    {
                        test : /\\.jsx?/,
                        use  : [
                            {
                                loader : 'babel-loader',
                            },
                        ],
                        include : /\\/${options.srcDir}/,
                    },
                    {
                        test    : /\\.css$/i,
                        include : /\\/${options.srcDir}/,
                        use     : [
                            {
                                loader : 'style-loader', // creates style nodes from JS strings
                            },
                            {
                                // translates CSS into CommonJS
                                loader  : 'css-loader',
                                options : {
                                    modules        : true,
                                    localIdentName : '[name]__[local]--[hash:base64:4]',
                                    importLoaders  : 1,
                                    url            : true,
                                },
                            },
                        ],
                    },
                ]
            },
            resolve : {
                extensions : [ '.js', '.jsx', '.json' ],
                mainFiles  : [ 'index' ],
                modules    : [ 'node_modules', path.resolve( __dirname, '${options.srcDir}' ) ],
            },
            plugins : [
                new CleanWebpackPlugin(),

                new MiniCssExtractPlugin( {
                    filename : '[name].css',
                } ),

                // creates a simple html file for development
                new HtmlWebpackPlugin( {
                    title : 'Project ${options.name}',
                    template : './index.html',
                } ),
            ],
        };`;

    return {
        fileName,
        config : format( {
            text            : config,
            prettierOptions : {
                eslintIntegration : true,
                parser            : 'babel',
            },
        } ),
    };
};

const getDevConfig = rootPath => {
    const fileName = path.resolve( rootPath, 'webpack.dev.js' );

    const config = `
    const merge = require( 'webpack-merge' );
    const common = require( './webpack.common.js' );

    module.exports = merge( common, {
        mode      : 'development',
        devtool   : 'inline-source-map',
        devServer : {
            contentBase         : './dist',
            port                : 8080,
            historyApiFallback  : true,
            clientLogLevel      :  'info',
            host                : '0.0.0.0',
            hot                 : true,
            overlay             : true,
            useLocalIp          : true,
        },
    } );`;

    return {
        fileName,
        config : format( {
            text            : config,
            prettierOptions : {
                eslintIntegration : true,
                parser            : 'babel',
            },
        } ),
    };
};

const getProdConfig = rootPath => {
    const fileName = path.resolve( rootPath, 'webpack.prod.js' );

    const config = `
    const merge = require( 'webpack-merge' );
    const common = require( './webpack.common.js' );
    const TerserPlugin = require( 'terser-webpack-plugin' );

    module.exports = merge( common, {
        mode : 'production',
        optimization: {
            splitChunks: {
                chunks  : 'all',
                minSize : 10000,
            },
            minimizer: [
                new TerserPlugin( {
                    cache           : true,
                    parallel        : true,
                    extractComments : true,
                } )
            ],
        },
    } );`;

    return {
        fileName,
        config : format( {
            text            : config,
            prettierOptions : {
                eslintIntegration : true,
                parser            : 'babel',
            },
        } ),
    };
};

const createWebpackConfigs = async ( rootPath, options ) => {
    console.log( '\ncreate Webpack configs\n-----------------------' );

    const configFunctions = [ getCommonConfig, getDevConfig, getProdConfig ];

    for ( const getConfig of configFunctions ) {
        const { fileName, config } = getConfig( rootPath, options );

        console.log( 'creating %s', fileName );

        await writeFile( fileName, config );
    }
};

module.exports = {
    createWebpackConfigs,
};
