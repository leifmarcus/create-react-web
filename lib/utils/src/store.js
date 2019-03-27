const path = require( 'path' );
const { writeFile } = require( '../file.js' );
const format = require( 'prettier-eslint' );

const getStoreIndexContents = () => {
    const imports = `
    import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
    import thunk from 'redux-thunk';

    // example reducer
    import counter from './counter/reducer.js';
    `;

    const contents = `
    const rootReducers = combineReducers( {
        counter,
        // add your reducers here ...
    } );

    /**
     * creates the main redux store
     *
     * @return {object} redux store
     */
    export default function createAppStore() {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        const enhancers = composeEnhancers( applyMiddleware( thunk ) );

        const store = createStore( rootReducers, enhancers );

        return store;
    }
    `;

    return format( {
        text            : `${imports}${contents}`,
        prettierOptions : {
            useEslintrc : true,
            parser      : 'babel',
        },
    } );
};

const getStoreUtilitiesContents = () => {
    const imports = '';

    const contents = `
    export const createReducer = ( initialState, handlers ) => {
        return function reducer( state = initialState, action ) {
            if ( handlers.hasOwnProperty( action.type ) ) {
                return handlers[ action.type ]( state, action );
            }

            return state;
        };
    };

    export const makeActionCreator = ( type, ...argNames ) => {
        return ( ...args ) => {
            const action = {
                type,
                payload : {},
            };
            argNames.forEach( ( arg, index ) => {
                action.payload[ argNames[ index ] ] = args[ index ];
            } );

            return action;
        };
    };
    `;

    return format( {
        text            : `${imports}${contents}`,
        prettierOptions : {
            useEslintrc : true,
            parser      : 'babel',
        },
    } );
};

const getReducerContents = () => {
    const imports = `
    import { UPDATE_COUNTER } from './actions';
    import { createReducer } from '../utilities';
    `;

    const contents = `

    const initialState = {
        value : 0
    };

    export default createReducer(
        initialState,
        {
            [ UPDATE_COUNTER ]( state, action ) {
                const { payload = {} } = action;

                return {
                    value : payload.value
                };
            },
        }
    );
    `;

    return format( {
        text            : `${imports}${contents}`,
        prettierOptions : {
            useEslintrc : true,
            parser      : 'babel',
        },
    } );
};

const getActionsContents = () => {
    const imports = `
    import { makeActionCreator } from '../utilities';
    `;

    const contents = `
    export const UPDATE_COUNTER = 'UPDATE_COUNTER';
    export const setCounter = makeActionCreator( UPDATE_COUNTER, 'value' );

    export const updateCounter = () => ( dispatch, getState ) => {
        const { counter } = getState();

        const counterValue = counter.value + 1;

        dispatch( setCounter( counterValue) );
    };
    `;

    return format( {
        text            : `${imports}${contents}`,
        prettierOptions : {
            useEslintrc : true,
            parser      : 'babel',
        },
    } );
};

const getSelectorContents = () => {
    const imports = `
    import get from 'lodash/get';
    `;

    const contents = `
    export const selectCounterValue = state => {
        return get( state, 'counter.value', 0 );
    };
    `;

    return format( {
        text            : `${imports}${contents}`,
        prettierOptions : {
            useEslintrc : true,
            parser      : 'babel',
        },
    } );
};

module.exports = async function createSourceStore( rootPath, options ) {
    console.log( '\ncreate react source store %s', options.name );
    console.log( '-------------------------------' );

    const storeIndex = path.resolve( rootPath, `${options.srcDir}/store/index.js` );
    const storeUtils = path.resolve( rootPath, `${options.srcDir}/store/utilities.js` );
    const storeCounterReducer = path.resolve( rootPath, `${options.srcDir}/store/counter/reducer.js` );
    const storeCounterAction = path.resolve( rootPath, `${options.srcDir}/store/counter/actions.js` );
    const storeCounterSelector = path.resolve( rootPath, `${options.srcDir}/store/counter/selectors.js` );

    const indexContents = getStoreIndexContents( options );
    const utilitiesContents = getStoreUtilitiesContents( options );
    const reducerContents = getReducerContents( options );
    const actionsContents = getActionsContents( options );
    const selectorContents = getSelectorContents( options );

    await writeFile( storeIndex, indexContents );
    await writeFile( storeUtils, utilitiesContents );
    await writeFile( storeCounterReducer, reducerContents );
    await writeFile( storeCounterAction, actionsContents );
    await writeFile( storeCounterSelector, selectorContents );
};
