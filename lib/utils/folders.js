const path = require( 'path' );
const { makeDirIfNeeded } = require( './file.js' );

const createFolders = async ( rootPath, options ) => {
    console.log( '\ncreate folder structure\n-----------------------' );

    const folders = [
        'dist',
        `${options.srcDir}/components`,
        `${options.srcDir}/containers/Page`,
        `${options.srcDir}/utilities`,
    ];

    if ( options.redux ) {
        folders.push( `${options.srcDir}/store/counter` );
    }

    try {
        for ( let i = 0; i < folders.length; i++ ) {
            const fullPath = path.resolve( rootPath, folders[ i ] );
            await makeDirIfNeeded( fullPath );
        }
    } catch ( error ) {
        throw new Error( error );
    }
};

module.exports = {
    createFolders,
};
