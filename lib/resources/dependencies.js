const dependencies = {
    '@babel/polyfill' : '7.4.4',
    'http-server'     : '0.11.1',
    lodash            : '4.17.11',
    'prop-types'      : '15.7.2',
    react             : '16.8.6',
    'react-dom'       : '16.8.6',
};

const devDependencies = {
    '@babel/core'                                : '7.4.4',
    '@babel/plugin-proposal-class-properties'    : '7.4.4',
    '@babel/plugin-proposal-export-default-from' : '7.2.0',
    '@babel/plugin-proposal-object-rest-spread'  : '7.4.4',
    '@babel/plugin-syntax-dynamic-import'        : '7.2.0',
    '@babel/preset-env'                          : '7.4.4',
    '@babel/preset-react'                        : '7.0.0',
    'babel-eslint'                               : '10.0.1',
    'babel-loader'                               : '8.0.5',
    'css-loader'                                 : '2.1.1',
    eslint                                       : '5.16.0',
    'eslint-config-prettier'                     : '4.2.0',
    'eslint-plugin-prettier'                     : '3.0.1',
    'eslint-plugin-react'                        : '7.12.4',
    'html-webpack-plugin'                        : '3.2.0',
    'terser-webpack-plugin'                      : '1.2.3',
    prettier                                     : '1.17.0',
    'prettier-eslint'                            : '8.8.2',
    'style-loader'                               : '0.23.1',
    webpack                                      : '4.30.0',
    'webpack-cli'                                : '3.3.1',
    'webpack-dev-server'                         : '3.3.1',
    'webpack-merge'                              : '4.2.1',
    'clean-webpack-plugin'                       : '2.0.1',
    'mini-css-extract-plugin'                    : '0.6.0',
};

const getDependencies = options => {
    const currDependencies = { ...dependencies };
    const currDevDependencies = { ...devDependencies };

    if ( options.redux ) {
        currDependencies.redux = '4.0.1';
        currDependencies[ 'react-redux' ] = '7.0.3';
        currDependencies[ 'redux-thunk' ] = '2.3.0';
    }

    if ( options.router ) {
        currDependencies[ 'react-router-dom' ] = '5.0.0';
    }

    if ( options.server ) {
        currDependencies.express = '4.16.4';
        currDependencies.compression = '1.7.4';
    }

    return {
        devDependencies : currDevDependencies,
        dependencies    : currDependencies,
    };
};

module.exports = {
    getDependencies,
    dependencies,
    devDependencies,
};
