# Create React Web

Simple react boilerplate generator. As `create-react-app` seems to be too big for some small projects I did, I decided to create this generator to generate a basic react web app.

**this is made for leon**

## Install Globally

If you are using yarn:

```bash
$ yarn global add @leif_marcus/create-react-web
```

otherwise you can use

```bash
$ npm install -g @leif_marcus/create-react-web
```

## Generate Boilerplate and start

```bash
# create and open a new directory:
$ mkdir my-new-project && cd my-new-project

# generate boilerplate:
$ create-react-web --redux --router

# run for development (webpack-dev-server):
$ yarn dev

# run for production (webpack -p)
$ yarn start
```

## options

You can specify certain options when generating the boilerplate:


| args       |           default          | description                                                                                  |
|------------|:--------------------------:|----------------------------------------------------------------------------------------------|
| `--name`   | current directory basename | you can specify a custom name for the app. Names follow the same rules as npm package names. |
| `--srcDir` |            `src`           | define where to save the main react application                                              |
| `--react`  |          `16.8.5`          | define which react version you want to use.                                                  |
| `--redux`  |           `false`          | generate `redux` boilerplate with the app. This will generate an example redux store with simple counter                                                  |
| `--router` |           `false`          | generate `react-router` boilerplate with the app                                             |
| `--server` |           `true`           | generate basic `express` server to serve the production version                              |                         |