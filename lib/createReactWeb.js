const { installDependencies } = require( './utils/project.js' );
const { createFolders } = require( './utils/folders.js' );
const { getPackageJson, createPackageJson } = require( './utils/package.js' );
const { createWebpackConfigs } = require( './utils/webpack.js' );
const createIndexHtml = require( './utils/html' );
const createEslintConfig = require( './utils/eslint.js' );
const createBabelConfig = require( './utils/babel.js' );
const createSourceIndex = require( './utils/src' );
const createSourceApp = require( './utils/src/app' );

module.exports = async function createReactWeb( options ) {
    const rootPath = process.cwd();

    // create folder structure:
    await createFolders( rootPath, options );

    // creating package json:
    const packageJson = getPackageJson( options );
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
};
