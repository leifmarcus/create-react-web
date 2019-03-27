const path = require( 'path' );
const { writeFile } = require( '../file.js' );
const { formatWithPrettier } = require( '../project' );

const getIndexContents = () => {
    return formatWithPrettier( 'export default from \'./Counter.jsx\';' );
};

const getCounterCssContents = () =>
    `.button {
    background: #000;
    border-radius: 4px;
    border: none;
    color: #fff;
    cursor: pointer;
    line-height: 24px;
    outline: none;
    transition: background 150ms ease-in 0s;
}

.button:hover {
    background: Teal;
}

.button:active {
    background: LightSeaGreen;
}
`;

const getCounterContents = () => {
    const imports = `
    import React, { Component } from 'react';
    import PropTypes from 'prop-types';
    import { connect } from 'react-redux';
    import { updateCounter, setCounter } from '../../store/counter/actions';
    import { selectCounterValue } from '../../store/counter/selectors';
    import classNames from './Counter.css';
    `;

    const contents = `
    class Counter extends Component {
        static propTypes = {
            counter       : PropTypes.number.isRequired,
            updateCounter : PropTypes.func.isRequired,
            setCounter    : PropTypes.func.isRequired,
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

        handleClick = () => {
            const COUNTER_START_VALUE = 0;
            this.props.setCounter( COUNTER_START_VALUE );
        }

        render() {
            return (
                <div>
                    Example Redux Counter: { this.props.counter }{ ' ' }
                    <button onClick={ this.handleClick } className={ classNames.button }>reset</button>
                </div>
            );
        }
    }

    const mapStateToProps = state => ( {
        counter : selectCounterValue( state ),
    } );

    const mapDispatchToProps = ( dispatch ) => ( {
        updateCounter() {
            dispatch( updateCounter() );
        },
        setCounter( value ) {
            dispatch( setCounter( value ) );
        },
    } );

    export default connect( mapStateToProps, mapDispatchToProps )( Counter );
    `;

    return formatWithPrettier( `${imports}${contents}` );
};

module.exports = async function createSourceCounter( rootPath, options ) {
    console.log( '\ncreate react source Counter' );
    console.log( '-------------------------------' );

    const indexFile = path.resolve( rootPath, `${options.srcDir}/components/Counter/index.js` );
    const componentFile = path.resolve( rootPath, `${options.srcDir}/components/Counter/Counter.jsx` );
    const cssFile = path.resolve( rootPath, `${options.srcDir}/components/Counter/Counter.css` );

    const indexContent = getIndexContents( options );
    const counterContents = getCounterContents( options );
    const counterCssContents = getCounterCssContents( options );

    await writeFile( indexFile, indexContent );
    await writeFile( componentFile, counterContents );
    await writeFile( cssFile, counterCssContents );
};
