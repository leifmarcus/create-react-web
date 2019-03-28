const { installDependencies } = require( './utils/project.js' );
const { createFolders } = require( './utils/folders.js' );
const { getPackageJson, createPackageJson } = require( './utils/package.js' );
const { createWebpackConfigs } = require( './utils/webpack.js' );
const createIndexHtml = require( './utils/html' );
const createEslintConfig = require( './utils/eslint.js' );
const createBabelConfig = require( './utils/babel.js' );
const createSourceIndex = require( './utils/src' );
const createSourceCounter = require( './utils/src/counter' );
const createSourceRouter = require( './utils/src/router' );
const createSourceApp = require( './utils/src/app' );
const createSourceStore = require( './utils/src/store' );
const createBasicServer = require( './utils/server' );

module.exports = async function createReactWeb( options ) {
    const rootPath = process.cwd();

    // create folder structure:
    await createFolders( rootPath, options );

    // creating package json:
    const packageJson = await getPackageJson( options );
    await createPackageJson( rootPath, packageJson );

    // creating my default eslint config
    await createEslintConfig( rootPath, options );

    // installing dependencies:
    const didInstall = await installDependencies( options );

    if ( !didInstall ) {
        return;
    }

    await createBabelConfig( rootPath, options );

    await createWebpackConfigs( rootPath, options );

    // create source files for web app:
    await createIndexHtml( rootPath, options );
    await createSourceIndex( rootPath, options );
    await createSourceApp( rootPath, options );

    if ( options.redux ) {
        await createSourceStore( rootPath, options );
        await createSourceCounter( rootPath, options );
    }

    if ( options.router ) {
        await createSourceRouter( rootPath, options );
    }

    if ( options.server ) {
        await createBasicServer( rootPath, options );
    }
};
