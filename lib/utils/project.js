const minimist = require( 'minimist' );
const parseGitConfig = require( 'parse-git-config' );
const path = require( 'path' );
const util = require( 'util' );
const childProcess = require( 'child_process' );
const exec = util.promisify( childProcess.exec );
const format = require( 'prettier-eslint' );

/**
 * checks if project name contains any string
 * @param {String} name a project name
 * @return {Bolean} true if name does not contain any spaces.
 */
const isValidProjectName = name => {
    return !( /\s/ ).test( name );
};

const getOptions = () => {
    const [ , , ...args ] = process.argv;

    const defaultOptions = {
        name   : 'create-react-web',
        help   : false,
        h      : false,
        vscode : true,
        srcDir : 'src',
        react  : '16.8.5',
        redux  : false,
        router : false,
    };

    const params = minimist( args );

    if ( !params.name ) {
        params.name = path.basename( process.cwd() );
    }

    const gitConfig = parseGitConfig.sync();
    if ( gitConfig && gitConfig[ 'remote "origin"' ] ) {
        params.git = gitConfig[ 'remote "origin"' ].url;
    }

    return {
        ...defaultOptions,
        ...params,
    };
};

const promiseFromChildProcess = child => {
    return new Promise( ( resolve, reject ) => {
        child.addListener( 'error', reject );
        child.addListener( 'exit', resolve );
    } );
};

const getYarnPath = async () => {
    const { stdout, stderr } = await exec( 'command -v yarn' );

    if ( stderr ) {
        throw new Error( stderr );
    }

    return stdout;
};

const installDependencies = async options => {
    console.log( '\ninstalling dependencies for %s', options.name );
    console.log( '-------------------------------' );

    const { spawn } = childProcess;

    try {
        const yarnPath = await getYarnPath();

        const installationExec = yarnPath ? 'yarn' : 'npm install';
        const installArgs = yarnPath ? [ '--no-lockfile' ] : [];

        const child = spawn( installationExec, installArgs );

        // use child.stdout.setEncoding('utf8'); if you want text chunks
        child.stdout.on( 'data', chunk => {
            // data from standard output is here as buffers
            console.log( chunk.toString() );
        } );

        const exitCode = await promiseFromChildProcess( child );

        return exitCode === 0;
    } catch ( err ) {
        console.log( err );
    }

    return false;
};

const formatWithPrettier = text => {
    if ( typeof text !== 'string' ) return '';

    return format( {
        text,
        prettierOptions : {
            useEslintrc : true,
            parser      : 'babel',
        },
    } );
};

module.exports = {
    formatWithPrettier,
    isValidProjectName,
    getOptions,
    installDependencies,
};
