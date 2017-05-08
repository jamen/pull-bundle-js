
# pull-bundle

> Bundle files inside a pull-stream

When [streaming files](https://npmjs.com/pull-files), use this to bundle the JavaScript with [`browserify`](https://npmjs.com/browserify).

```js
var pull = require('pull-stream')
var { read, write } = require('pull-files')
var bundle = require('pull-bundle')

pull(
  read([ 'index.js', 'lib/**/*.js' ], { cwd: __dirname }),
  bundle('app.js'),
  write('out', err => {
    // finished
  })
)
```

## Install

```sh
npm install --save-dev pull-bundle

# with yarn
yarn add --dev pull-bundle
```

## Usage

### `bundle(options)`

### `bundle(dest, transform?)`

Bundles JavaScript files inside the stream into one file.

The options from `options` (or the shorthand) are passed to [`browserify(options)`](https://www.npmjs.com/package/browserify#browserifyfiles--opts), in addition to:

 - `dest`: Path of the resulting bundle
 - `pass`: Allow non-javascript files to pass through the bundle, like CSS files.  (Default: `true`)
