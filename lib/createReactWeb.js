const { installDependencies } = require( './utils/project.js' );
const { getPackageJson, createPackageJson } = require( './utils/package.js' );
const { createWebpackConfigs } = require( './utils/webpack.js' );
const createEslintConfig = require( './utils/eslint.js' );
const createBabelConfig = require( './utils/babel.js' );
const createReactSource = require( './utils/src.js' );

module.exports = async function createReactWeb( options ) {
    const rootPath = process.cwd();

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

    await createReactSource( rootPath, options );
};
