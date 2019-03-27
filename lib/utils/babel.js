const path = require( 'path' );
const { writeFile } = require( './file.js' );
const format = require( 'prettier-eslint' );

const getBabelConfig = () => {
    const babelConfig = `
        module.exports = {
            presets : [
                [
                    '@babel/env',
                    {
                        targets : {
                            browsers : [ 'ie > 10', 'last 2 versions', 'edge > 13' ],
                        },
                        useBuiltIns : 'entry',
                        modules     : false,
                    },
                ],
                '@babel/preset-react',
            ],
            compact : true,
            plugins : [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-export-default-from',
            ],
            env : {
                test : {
                    presets : [ '@babel/env', '@babel/preset-react' ],
                    plugins : [
                        [
                            'module-resolver',
                            {
                                root  : './app',
                                alias : {
                                    config : './config/stage.json',
                                },
                            },
                        ],
                        '@babel/plugin-syntax-dynamic-import',
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-proposal-object-rest-spread',
                        '@babel/plugin-proposal-export-default-from',
                    ],
                },
            },
        };`;

    return format( {
        text            : babelConfig,
        prettierOptions : {
            useEslintrc : true,
            parser      : 'babel',
        },
    } );
};

module.exports = async function createBabelConfig( rootPath, options ) {
    console.log( '\ncreating babel config for %s', options.name );
    console.log( '-------------------------------' );

    const fileName = path.resolve( rootPath, 'babel.config.js' );

    const babelConfig = getBabelConfig();

    return await writeFile( fileName, babelConfig );
};
