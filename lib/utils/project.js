const minimist = require( 'minimist' );
const parseGitConfig = require( 'parse-git-config' );
const path = require( 'path' );

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

module.exports = {
    isValidProjectName,
    getOptions,
};
