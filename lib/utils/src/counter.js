const path = require( 'path' );
const { writeFile } = require( '../file.js' );
const format = require( 'prettier-eslint' );

const getIndexContents = () => {
    return format( {
        text            : 'export default from \'./Counter.jsx\';',
        prettierOptions : {
            useEslintrc : true,
            parser      : 'babel',
        },
    } );
};

const getCounterContents = () => {
    const imports = `
    import React, { Component } from 'react';
    import PropTypes from 'prop-types';
    import { connect } from 'react-redux';
    import { updateCounter } from '../../store/counter/actions';
    import { selectCounterValue } from '../../store/counter/selectors';
    `;

    const contents = `
    class Counter extends Component {
        static propTypes = {
            counter       : PropTypes.number,
            updateCounter : PropTypes.func,
        };

        timer = 0;

        componentDidMount() {
            this.timer = setInterval( () => {
                this.props.updateCounter();
            }, 1000 );
        }

        componentWillUnmount() {
            clearTimeout( this.timer );
        }

        render() {
            return (
                <div>Example Redux Counter: { this.props.counter }</div>
            );
        }
    }

    const mapStateToProps = state => ( {
        counter : selectCounterValue( state ),
    } );

    const mapDispatchToProps = ( dispatch ) => ( {
        updateCounter() {
            dispatch( updateCounter() );
        }
    } );

    export default connect( mapStateToProps, mapDispatchToProps )( Counter );
    `;

    return format( {
        text            : `${imports}${contents}`,
        prettierOptions : {
            useEslintrc : true,
            parser      : 'babel',
        },
    } );
};

module.exports = async function createSourceCounter( rootPath, options ) {
    console.log( '\ncreate react source index.jsx %s', options.name );
    console.log( '-------------------------------' );

    const indexFile = path.resolve( rootPath, `${options.srcDir}/components/Counter/index.js` );
    const componentFile = path.resolve( rootPath, `${options.srcDir}/components/Counter/Counter.jsx` );

    const indexContent = getIndexContents( options );
    const counterContents = getCounterContents( options );

    await writeFile( indexFile, indexContent );
    await writeFile( componentFile, counterContents );
};
