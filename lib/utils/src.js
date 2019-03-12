const path = require( 'path' );
const { writeFile } = require( './file.js' );
const format = require( 'prettier-eslint' );

const getIndex = options => {
    const indexJs = `
    `;

    return format( {
        text            : indexJs,
        prettierOptions : {
            useEslintrc : true,
            parser      : 'babel',
        },
    } );
};

module.exports = async function createReactSource( rootPath, options ) {
    console.log( '\ncreating basic react app for %s', options.name );
    console.log( '-------------------------------' );

    const indexFile = path.resolve( rootPath, `${options.srcDir}/index.js` );

    const indexContent = getIndex( options );

    await writeFile( indexFile, indexContent );
};
