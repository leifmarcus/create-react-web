const path = require( 'path' );
const { writeFile } = require( '../file.js' );
const format = require( 'prettier-eslint' );

const getAppCSSContents = () => {
    return `body {
    font-family: Helvetica Neue, Helvetica, sans-serif;
    font-size: 16px;
}
.App {
    width: 75vw;
    max-width: 850px;
    margin: 16px auto;
}
`;
};

const getAppJSContents = options => {
    let imports = `
    import React from 'react';
    import classNames from './App.css';
    import PropTypes from 'prop-types';
    `;

    let lifeCycle = '';
    let counterOutput = '';

    if ( options.redux ) {
        lifeCycle = `
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
        `;

        counterOutput = '<p>Example Counter from redux store: { this.props.counter }</p>';
    }

    let contents = `
    class App extends React.Component {
        ${lifeCycle}

        render() {
            return (
                <div className={ classNames.App }>
                    <h1>Create React Web</h1>
                    <p>Simple boilerplate for react web apps.</p>
                    ${counterOutput}
                </div>
            );
        }
    }
    `;

    let defaultExport = '\n\nexport default App;\n';

    if ( options.redux ) {
        imports += `import { connect } from 'react-redux';
        import { updateCounter } from '../store/counter/actions';
        import { selectCounterValue } from '../store/counter/selectors';
        `;

        contents += `
        const mapStateToProps = ( state ) => {
            return {
                counter : selectCounterValue( state ),
            };
        };

        const mapDispatchToProps = ( dispatch ) => ( {
            updateCounter() {
                dispatch( updateCounter() );
            }
        } );
        `;

        defaultExport = `
            export default connect( mapStateToProps, mapDispatchToProps )( App );
        `;
    }

    contents += `${defaultExport}`;

    return format( {
        text            : `${imports}${contents}`,
        prettierOptions : {
            useEslintrc : true,
            parser      : 'babel',
        },
    } );
};

module.exports = async function createSourceApp( rootPath, options ) {
    console.log( '\ncreate react source index.js %s', options.name );
    console.log( '-------------------------------' );

    const appJSFile = path.resolve( rootPath, `${options.srcDir}/components/App.jsx` );
    const appCSSFile = path.resolve( rootPath, `${options.srcDir}/components/App.css` );

    const appJSContents = getAppJSContents( options );
    const appCSSContents = getAppCSSContents( options );

    await writeFile( appJSFile, appJSContents );
    await writeFile( appCSSFile, appCSSContents );
};
