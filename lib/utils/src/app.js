const path = require( 'path' );
const { writeFile } = require( '../file.js' );
const format = require( 'prettier-eslint' );

const getAppCSSContents = () => {
    return `body {
    font-family: Helvetica Neue, Helvetica, sans-serif;
    font-size: 16px;
}
.App {
    width: 75vw;
    max-width: 850px;
    margin: 16px auto;
}
`;
};

const getAppJSContents = options => {
    let imports = `
    import React from 'react';
    import classNames from './App.css';
    `;

    let counterOutput = '';

    if ( options.redux ) {
        imports += `import Counter from './Counter';
        `;

        counterOutput = `
        <Counter />
        `;
    }

    const contents = `
    const App = () => {
    return (
            <div className={ classNames.App }>
                <h1>Create React Web</h1>
                <p>Simple boilerplate for react web apps.</p>
                ${counterOutput}
            </div>
        );
    }

    export default React.memo( App );
    `;

    return format( {
        text            : `${imports}${contents}`,
        prettierOptions : {
            useEslintrc : true,
            parser      : 'babel',
        },
    } );
};

module.exports = async function createSourceApp( rootPath, options ) {
    console.log( '\ncreate react source index.js %s', options.name );
    console.log( '-------------------------------' );

    const appJSFile = path.resolve( rootPath, `${options.srcDir}/components/App.jsx` );
    const appCSSFile = path.resolve( rootPath, `${options.srcDir}/components/App.css` );

    const appJSContents = getAppJSContents( options );
    const appCSSContents = getAppCSSContents( options );

    await writeFile( appJSFile, appJSContents );
    await writeFile( appCSSFile, appCSSContents );
};
