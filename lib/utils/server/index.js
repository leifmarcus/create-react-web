const path = require( 'path' );
const { writeFile } = require( '../file.js' );
const { formatWithPrettier } = require( '../project' );

const getServerContents = options =>
    formatWithPrettier( `
    /* eslint-disable no-console */
    const path = require( 'path' );
    const express = require( 'express' );
    const compression = require( 'compression' );

    const app = express();

    const port = process.env.PORT || 3000;
    const staticPath = path.resolve( __dirname, '../dist' );
    const indexHtmlPath = path.resolve( staticPath, 'index.html' );

    // use gzip compression
    app.use( compression() );

    app.use( express.static( staticPath ) );

    // not found in static files, so default to index.html
    app.use( ( req, res ) => res.sendFile( indexHtmlPath ) );

    app.listen( port, () => {
        console.log( \`\\n\\n${options.name} is listening on port \${port}!\` );
    } );
` );

module.exports = async function createBasicServer( rootPath, options ) {
    console.log( '\ncreate prod server\n-----------------------' );
    const fileName = path.resolve( rootPath, 'server/index.js' );
    const contents = getServerContents( options );

    await writeFile( fileName, contents );
};
