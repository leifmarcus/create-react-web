const allDependencies = require( '../resources/dependencies.js' );
const path = require( 'path' );
const { writeFile, fileExists, readFile } = require( './file.js' );
const _ = require( 'lodash' );

const getPackageJson = options => {
    const updatedDependencies = {
        ...allDependencies,
        dependencies : {
            ...allDependencies.dependencies,
            react : options.react,
        },
    };

    const packageJson = {
        name       : options.name,
        version    : '1.0.0',
        main       : 'src/index.jsx',
        repository : {
            type : 'git',
            url  : options.git,
        },
        scripts : {
            dev   : 'webpack-dev-server --progress',
            build : 'webpack -p --config webpack.config.prod.js',
            start : 'http-server ./dist -p 1234 -i',
            test  : 'echo "Error: no test specified" && exit 1',
        },
        license : 'ISC',
        ...updatedDependencies,
    };

    return JSON.stringify( packageJson, null, 4 );
};

const createPackageJson = async ( rootPath, content ) => {
    console.log( '\ncreate basic package.json ...' );
    console.log( '-------------------------------' );
    const fileName = path.resolve( rootPath, 'package.json' );

    const doesExist = await fileExists( fileName );
    let packageContent = content;

    if ( doesExist ) {
        console.log( 'package.json does already exists, will merge package.json' );

        const packageData = JSON.parse( content );

        const fileContent = await readFile( fileName );
        const fileData = JSON.parse( fileContent );

        packageContent = JSON.stringify( _.merge( packageData, fileData ), null, 4 );
    }

    console.log( 'write package.json data.' );

    return await writeFile( fileName, packageContent );
};

module.exports = {
    getPackageJson,
    createPackageJson,
};
