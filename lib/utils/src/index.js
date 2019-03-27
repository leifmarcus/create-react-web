const path = require( 'path' );
const { writeFile } = require( '../file.js' );
const { formatWithPrettier } = require( '../project' );

const getIndex = options => {
    let imports = `
    // make sure that the polyfill is loaded
    // as the first thing in the whole app
    import '@babel/polyfill';
    // -------------------------------------
    import React from 'react';
    import { render } from 'react-dom';
    import App from './components/App';
    `;

    let contents = '';

    let rootElement = '<App />';

    // ----------------------------------------------------
    // redux:
    if ( options.redux ) {
        imports += `import { Provider } from 'react-redux';
        import createAppStore from './store';
        `;

        contents += `
        const store = createAppStore();
        `;

        rootElement = `<Provider store={ store }>${rootElement}</Provider>`;
    }

    // ----------------------------------------------------
    // react router:
    if ( options.router ) {
        imports += `import { BrowserRouter as Router } from 'react-router-dom';
        `;

        rootElement = `<Router>${rootElement}</Router>`;
    }

    contents += `
    render( ${rootElement}, document.getElementById( 'app' ) );
    `;

    return formatWithPrettier( `${imports}${contents}` );
};

module.exports = async function createSourceIndex( rootPath, options ) {
    console.log( '\ncreate react source index.jsx %s', options.name );
    console.log( '-------------------------------' );

    const indexFile = path.resolve( rootPath, `${options.srcDir}/index.jsx` );

    const indexContent = getIndex( options );

    await writeFile( indexFile, indexContent );
};
