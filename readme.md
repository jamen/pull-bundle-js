
# pull-bundle-js

> Bundle JavaScript files inside a pull-stream

When [streaming files](https://npmjs.com/pull-files), use this to bundle the JavaScript with [`browserify`](https://npmjs.com/browserify).

```js
var pull = require('pull-stream')
var { read, write } = require('pull-files')
var bundle = require('pull-bundle-js')

pull(
  read([ 'index.js', 'lib/**/*.js' ], { cwd: __dirname }),
  bundle('app.js', ['babelify', 'es2040']),
  write('out', err => {
    // finished
  })
)
```

## Install

```sh
npm install --save-dev pull-bundle
```

```sh
yarn add --dev pull-bundle
```

## Usage

### `bundle(options)`

### `bundle(path?, transform?)`

Bundles commonjs files using [Browserify](https://github.com/substack/node-browserify) for use on the browser.

The options from `options` (or the shorthand) are passed to [`browserify(options)`](https://www.npmjs.com/package/browserify#browserifyfiles--opts), in addition to:

 - `dest`: Path of the resulting bundle
 - `pass`: Allow non-javascript files to pass through the bundle, like CSS files.  (Default: `true`)


## Also see

 - [`pull-files`](https://npmjs.com/pull-files)
