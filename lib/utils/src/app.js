const path = require( 'path' );
const { writeFile } = require( '../file.js' );
const { formatWithPrettier } = require( '../project' );

const getAppCSSContents = () =>
    `body {
    font-family: Helvetica Neue, Helvetica, sans-serif;
    font-size: 16px;
    color: #444;
}

header {
    color: Teal;
}

header h1 {
    font-size: 24px;
}

.App {
    width: 75vw;
    max-width: 850px;
    margin: 16px auto;
}
`;

const getAppJSContents = options => {
    let imports = `
    import React from 'react';
    import classNames from './App.css';
    `;

    let counterOutput = '';
    let routerOutput = '';

    if ( options.redux ) {
        imports += `import Counter from './Counter';
        `;

        counterOutput = `
        <Counter />
        `;
    }

    if ( options.router ) {
        imports += `import { Route, Switch } from 'react-router-dom';

        // lazy loading examples for routes
        const Page = React.lazy( () => import( '../containers/Page' ) );
        const NotFound = React.lazy( () => import( '../containers/NotFound' ) );
        // --------------------------------
        `;

        routerOutput = `
        <React.Suspense fallback="loading">
            <Switch>
                <Route path="/" component={ Page } exact />
                <Route path="*" component={ NotFound } />
            </Switch>
        </React.Suspense>
        `;
    }

    const contents = `
    const App = () => {
    return (
            <div className={ classNames.App }>
                <header>
                    <h1>Create React Web</h1>
                </header>
                <main>
                    <p>Simple boilerplate generator for react web apps.</p>
                    ${counterOutput}
                    ${routerOutput}
                </main>
            </div>
        );
    }

    export default React.memo( App );
    `;

    return formatWithPrettier( `${imports}${contents}` );
};

module.exports = async function createSourceApp( rootPath, options ) {
    console.log( '\ncreate react source App' );
    console.log( '-------------------------------' );

    const appJSFile = path.resolve( rootPath, `${options.srcDir}/components/App.jsx` );
    const appCSSFile = path.resolve( rootPath, `${options.srcDir}/components/App.css` );

    const appJSContents = getAppJSContents( options );
    const appCSSContents = getAppCSSContents( options );

    await writeFile( appJSFile, appJSContents );
    await writeFile( appCSSFile, appCSSContents );
};
