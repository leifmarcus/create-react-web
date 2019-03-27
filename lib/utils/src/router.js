const path = require( 'path' );
const { writeFile } = require( '../file.js' );
const { formatWithPrettier } = require( '../project' );

const getIndexContents = () => {
    return formatWithPrettier( 'export default from \'./Page\'' );
};

const getPageCSSContents = () =>
    `.Page {
    margin-top: 16px;
}
`;

const getPageContents = () => {
    const imports = `
    import React from 'react';
    import PropTypes from 'prop-types';
    import { withRouter } from 'react-router-dom';
    import classNames from './Page.css';
    `;

    const contents = `
    const Page = ( { location } ) => {
        return <div className={ classNames.Page }>Example Page: { location.pathname }</div>;
    }

    Page.propTypes = {
        match    : PropTypes.object.isRequired,
        location : PropTypes.object.isRequired,
        history  : PropTypes.object.isRequired
    };

    export default withRouter( Page );
    `;

    return formatWithPrettier( `${imports}${contents}` );
};

const getNotFoundIndexContents = () => {
    return formatWithPrettier( 'export default from \'./NotFound\'' );
};

const getNotFoundContents = () => {
    const imports = `
    import React from 'react';
    import PropTypes from 'prop-types';
    import { withRouter } from 'react-router-dom';
    import classNames from './NotFound.css';
    `;

    const contents = `
    const NotFound = ( { location } ) => {
        return <div className={ classNames.NotFound }>404 – page not found: { location.pathname }</div>;
    }

    NotFound.propTypes = {
        match    : PropTypes.object.isRequired,
        location : PropTypes.object.isRequired,
        history  : PropTypes.object.isRequired
    };

    export default withRouter( NotFound );
    `;

    return formatWithPrettier( `${imports}${contents}` );
};

const getNotFoundCSSContents = () =>
    `.NotFound {
    margin-top: 100px;
    font-weight: bold;
}
`;

module.exports = async function createSourceRouter( rootPath, options ) {
    console.log( '\ncreate react source containers' );
    console.log( '-------------------------------' );

    const indexPageFile = path.resolve( rootPath, `${options.srcDir}/containers/Page/index.js` );
    const pageFile = path.resolve( rootPath, `${options.srcDir}/containers/Page/Page.jsx` );
    const pageCSSFile = path.resolve( rootPath, `${options.srcDir}/containers/Page/Page.css` );
    const indexNotFoundFile = path.resolve( rootPath, `${options.srcDir}/containers/NotFound/index.js` );
    const notFoundFile = path.resolve( rootPath, `${options.srcDir}/containers/NotFound/NotFound.jsx` );
    const notFoundCssFile = path.resolve( rootPath, `${options.srcDir}/containers/NotFound/NotFound.css` );

    const indexPageContent = getIndexContents( options );
    const pageContents = getPageContents( options );
    const pageCssContents = getPageCSSContents( options );
    const indexNotFoundContent = getNotFoundIndexContents( options );
    const notFoundContents = getNotFoundContents( options );
    const notFoundCssContents = getNotFoundCSSContents( options );

    await writeFile( indexPageFile, indexPageContent );
    await writeFile( pageFile, pageContents );
    await writeFile( pageCSSFile, pageCssContents );

    await writeFile( indexNotFoundFile, indexNotFoundContent );
    await writeFile( notFoundFile, notFoundContents );
    await writeFile( notFoundCssFile, notFoundCssContents );
};
