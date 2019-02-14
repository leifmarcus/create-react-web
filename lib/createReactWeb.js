const { getPackageJson, createPackageJson } = require( './utils/package.js' );

module.exports = async function createReactWeb( options ) {
    const rootPath = process.cwd();

    const packageJson = getPackageJson( options );

    await createPackageJson( rootPath, packageJson );
};
