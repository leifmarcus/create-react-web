const path = require( 'path' );
const { writeFile } = require( './file.js' );

const getEslintRc = options => {
    const eslintrc = {
        parser        : 'babel-eslint',
        parserOptions : {
            ecmaVersion  : 8,
            sourceType   : 'module',
            ecmaFeatures : {
                jsx : true,
            },
        },
        settings : {
            react : {
                pragma  : 'React',
                version : options.react,
            },
        },
        globals : {
            test     : true,
            describe : true,
            expect   : true,
            Promise  : true,
            Map      : true,
        },
        env : {
            browser : true,
            node    : true,
        },
        extends : [ 'eslint:recommended', 'plugin:react/recommended', 'prettier', 'prettier/react' ],
        plugins : [ 'react', 'prettier' ],
        rules   : {
            'array-bracket-spacing'     : [ 2, 'always' ],
            'arrow-spacing'             : 2,
            'block-spacing'             : [ 2, 'always' ],
            'brace-style'               : [ 'error', '1tbs', { allowSingleLine : true } ],
            camelcase                   : 2,
            'comma-dangle'              : [ 2, 'always-multiline' ],
            'comma-style'               : 2,
            'comma-spacing'             : [ 2, { before : false,
                after  : true } ],
            'computed-property-spacing' : [ 2, 'always' ],
            'consistent-this'           : [ 2, 'self' ],
            'constructor-super'         : 2,
            'eol-last'                  : 2,
            'func-call-spacing'         : 2,
            'func-style'                : [ 2, 'declaration', { allowArrowFunctions : true } ],
            indent                      : 2,
            'jsx-quotes'                : 2,
            'key-spacing'               : [
                2,
                {
                    beforeColon : true,
                    afterColon  : true,
                    mode        : 'minimum',
                    align       : 'colon',
                },
            ],
            'keyword-spacing'               : [ 2, { before : true,
                after  : true } ],
            'linebreak-style'               : [ 2, 'unix' ],
            'max-len'                       : [ 'error', { ignoreUrls : true,
                code       : 120 } ],
            'max-statements'                : [ 2, 60 ],
            'new-cap'                       : 2,
            'new-parens'                    : 2,
            'newline-before-return'         : 2,
            'no-console'                    : [ 2, { allow : [ 'warn', 'error', 'assert' ] } ],
            'no-const-assign'               : 2,
            'no-else-return'                : 2,
            'no-extra-parens'               : [ 2, 'all', { ignoreJSX               : 'all',
                nestedBinaryExpressions : false } ],
            'no-extra-semi'                 : 2,
            'no-find-dom-node'              : 0,
            'no-lonely-if'                  : 2,
            'no-this-before-super'          : 2,
            'no-trailing-spaces'            : 2,
            'no-param-reassign'             : 2,
            'no-underscore-dangle'          : 0,
            'no-unneeded-ternary'           : 2,
            'no-unused-vars'                : [ 2, { argsIgnorePattern : '^_' } ],
            'no-useless-rename'             : 2,
            'no-var'                        : 2,
            'no-whitespace-before-property' : 2,
            'object-curly-newline'          : [
                0,
                {
                    ObjectExpression : {
                        multiline     : false,
                        minProperties : 1,
                    },
                    ObjectPattern : { multiline : true },
                },
            ],
            'object-curly-spacing'    : [ 2, 'always' ],
            'object-property-newline' : 2,
            'one-var'                 : [ 2, 'never' ],
            'prefer-arrow-callback'   : 2,
            'prefer-const'            : [
                2,
                {
                    destructuring          : 'any',
                    ignoreReadBeforeAssign : false,
                },
            ],
            'prefer-template' : 2,
            quotes            : [ 2, 'single' ],
            'require-jsdoc'   : [
                2,
                {
                    require : {
                        FunctionDeclaration     : true,
                        MethodDefinition        : false,
                        ClassDeclaration        : false,
                        ArrowFunctionExpression : false,
                        FunctionExpression      : false,
                    },
                },
            ],
            semi                          : 2,
            'space-before-function-paren' : [ 2, 'never' ],
            'space-in-parens'             : [ 2, 'always' ],
            'space-infix-ops'             : 2,
            'space-unary-ops'             : 2,
            'template-curly-spacing'      : 2,
            'valid-jsdoc'                 : [
                2,
                {
                    requireParamDescription : false,
                    requireReturn           : false,
                },
            ],
            'wrap-regex' : 2,

            'react/jsx-closing-bracket-location' : [ 'error', 'line-aligned' ],
            'react/jsx-indent-props'             : [ 'error', 4 ],
            'react/jsx-max-props-per-line'       : [ 'off', { maximum : 1,
                when    : 'multiline' } ],
            'react/jsx-no-undef'                 : 'error',
            'react/jsx-pascal-case'              : [
                'error',
                {
                    allowAllCaps : true,
                    ignore       : [],
                },
            ],
            'react/jsx-wrap-multilines' : [
                'error',
                {
                    declaration : 'parens-new-line',
                    assignment  : 'parens-new-line',
                    return      : 'parens-new-line',
                    arrow       : 'parens-new-line',
                    condition   : 'ignore',
                    logical     : 'parens-new-line',
                    prop        : 'ignore',
                },
            ],
            'react/prefer-es6-class'        : [ 'error', 'always' ],
            'react/self-closing-comp'       : 'error',
            'react/jsx-first-prop-new-line' : [ 'error', 'multiline' ],
            'react/jsx-equals-spacing'      : [ 'error', 'never' ],
            'react/jsx-indent'              : [ 'error', 4 ],
            'react/jsx-curly-spacing'       : [ 2, { when     : 'always',
                children : true } ],
            'react/jsx-tag-spacing'         : [
                'error',
                {
                    closingSlash      : 'never',
                    beforeSelfClosing : 'always',
                    afterOpening      : 'never',
                },
            ],
        },
    };

    return JSON.stringify( eslintrc, null, 4 );
};

module.exports = async function createEslintConfig( rootPath, options ) {
    console.log( '\ncreating eslint config for %s', options.name );
    console.log( '-------------------------------' );

    const fileName = path.resolve( rootPath, '.eslintrc' );

    const eslintConfig = getEslintRc( options );

    return await writeFile( fileName, eslintConfig );
};
