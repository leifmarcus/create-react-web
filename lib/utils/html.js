const path = require( 'path' );
const { writeFile } = require( './file.js' );

const getIndexHtmlContents = () => {
    return `<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title>Create React Web – simple react boilerplate</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
            <div id="app"></div>
        </body>
    </html>
`;
};

module.exports = async function createIndexHtml( rootPath, options ) {
    console.log( '\ncreate main html file\n-----------------------' );
    const fileName = path.resolve( rootPath, 'index.html' );
    const contents = getIndexHtmlContents();

    await writeFile( fileName, contents );
};
