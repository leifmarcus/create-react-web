#!/usr/bin/env node
const { isValidProjectName, getOptions } = require( './lib/utils/project.js' );
const readlineSync = require( 'readline-sync' );
const createReactWeb = require( './lib/createReactWeb.js' );

const options = getOptions();

if ( options.help || options.h ) {
    console.log( 'help here ...' );
    process.exit();
}

if ( !options.name ) {
    options.name = readlineSync.question( 'Please enter a project name: ' );
}

if ( !isValidProjectName( options.name ) ) {
    console.log( 'project name must not contain spaces ...' );
    process.exit();
}

( async () => {
    try {
        await createReactWeb( options );
    } catch ( error ) {
        console.log( error );
    }
} )();
