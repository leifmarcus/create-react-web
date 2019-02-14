const path = require( 'path' );
const format = require( 'prettier-eslint' );
const { writeFile /*fileExists*/ } = require( './file.js' );

const getCommonConfig = ( rootPath, options ) => {
    const fileName = path.resolve( rootPath, 'webpack.common.js' );

    const config = `
const path = require( 'path' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
    entry   : './src/index.jsx',
    plugins : [
        new CleanWebpackPlugin( [ 'dist' ] ),

        // creates a simple html file for development
        new HtmlWebpackPlugin( {
            title : '${options.name}',
        } ),
    ],
    module : {
        rules : [

        ]
    },
    output : {
        filename : '${options.name}.js',
        path     : path.resolve( __dirname, 'dist' ),
    },
};
`;

    return {
        fileName,
        config : format( {
            text            : config,
            prettierOptions : {
                parser : 'babel',
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
        contentBase : './dist',
    },
} );
`;

    return {
        fileName,
        config : format( {
            text            : config,
            prettierOptions : {
                parser : 'babel',
            },
        } ),
    };
};

const getProdConfig = rootPath => {
    const fileName = path.resolve( rootPath, 'webpack.prod.js' );

    const config = `
const merge = require( 'webpack-merge' );
const common = require( './webpack.common.js' );

module.exports = merge( common, {
    mode : 'production',
} );
`;

    return {
        fileName,
        config : format( {
            text            : config,
            prettierOptions : {
                parser : 'babel',
            },
        } ),
    };
};

const createWebpackConfigs = async ( rootPath, options ) => {
    console.log( '\ncreate Webpack configs\n-----------------------' );
    const configFunctions = [ getCommonConfig, getDevConfig, getProdConfig ];

    for ( const getConfig of configFunctions ) {
        const { fileName, config } = getConfig( rootPath, options );

        // const exists = await fileExists( fileName );
        // if ( exists ) {
        //     console.log( '%s does alreay exist', path.basename( fileName ) );

        //     continue;
        // }

        console.log( 'create webpack common config' );

        await writeFile( fileName, config );
    }
};

module.exports = {
    createWebpackConfigs,
};
