const { getPackageJson, createPackageJson } = require( './utils/package.js' );
const { createWebpackConfigs } = require( './utils/webpack.js' );

module.exports = async function createReactWeb( options ) {
    const rootPath = process.cwd();

    const packageJson = getPackageJson( options );

    await createPackageJson( rootPath, packageJson );

    await createWebpackConfigs( rootPath, options );
};
