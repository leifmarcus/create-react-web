const fs = require( 'fs' );

/**
 * checks if a file exists
 *
 * @param {String} path absolute or relative file path
 *
 * @return {Promise} Resolves either with true or false
 */
const fileExists = path => {
    return new Promise( ( resolve, reject ) => {
        fs.access( path, fs.constants.F_OK, err => {
            if ( err ) {
                if ( err.code === 'ENOENT' ) {
                    resolve( false );
                } else {
                    reject( err );
                }
            } else {
                resolve( true );
            }
        } );
    } );
};

const readFile = ( path, opts = 'utf8' ) => {
    return new Promise( ( resolve, reject ) => {
        fs.readFile( path, opts, ( err, data ) => {
            if ( err ) {
                reject( err );
            } else {
                resolve( data );
            }
        } );
    } );
};

const writeFile = ( path, data, opts = 'utf8' ) => {
    return new Promise( ( resolve, reject ) => {
        fs.writeFile( path, data, opts, err => {
            if ( err ) {
                reject( err );
            } else {
                resolve();
            }
        } );
    } );
};

module.exports = {
    readFile,
    fileExists,
    writeFile,
};
