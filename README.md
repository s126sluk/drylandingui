# team-gulp-template

> For convenient collaborative work on the project, it is recommended that all participants install the [EditorConfig](https://editorconfig.org/#download) plugin in their editor.

## Build Overview

## Node version 21.7.1

### Install all dependencies

`npm install` or `npm i`

### Main development task

`gulp`
`npm start`

### After running `gulp`, run server and open `/build/index.html` every start rebuild project

### Rebuild task

`gulp build`
`npm run build`

### Deploy to server

`gulp deploy`

### Create a component

`gulp create --componentName`

This task automatically creates:
- a `pug` file in `src/templates/components/`;
- an `scss` file in `src/styles/components/`;
- a `js` file in `src/jss/modules/`.

### Example of connecting a JS polyfill:

```js
import 'core-js/features/array/includes';
console.log([1, 2, 3, 4].includes(4)); // example
