const path = require( 'path' );
const { writeFile } = require( '../file.js' );
const format = require( 'prettier-eslint' );

const getIndex = options => {
    const imports = `
    import React from 'react';
    import { render } from 'react-dom';
    import { Provider } from 'react-redux';
    import App from './components/App';
    import createAppStore from './store';
    `;

    let contents = '';

    let rootElement = '<App />';

    if ( options.redux ) {
        contents += `

        const store = createAppStore();

        `;
        rootElement = `<Provider store={ store }>${rootElement}</Provider>`;
    }

    contents += `
    render( ${rootElement}, document.getElementById( 'app' ) );
    `;

    return format( {
        text            : `${imports}${contents}`,
        prettierOptions : {
            useEslintrc : true,
            parser      : 'babel',
        },
    } );
};

module.exports = async function createSourceIndex( rootPath, options ) {
    console.log( '\ncreate react source index.jsx %s', options.name );
    console.log( '-------------------------------' );

    const indexFile = path.resolve( rootPath, `${options.srcDir}/index.jsx` );

    const indexContent = getIndex( options );

    await writeFile( indexFile, indexContent );
};
