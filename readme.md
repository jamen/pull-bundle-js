
# pull-bundle-js

> Bundle JS files inside pull-stream with Browserify

Bundles the [js pull-stream files](https://github.com/jamen/pull-files) using [Browserify](https://github.com/substack/node-browserify)

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
npm i pull-bundle-js
```

## Usage

### `bundle(path?, transforms?)`

Bundles commonjs files using [Browserify](https://github.com/substack/node-browserify) to use commonjs modules and several Node.js built-ins on the browser

The `options` are passed to [`browserify(options)`](https://www.npmjs.com/package/browserify#browserifyfiles--opts), in addition to:

 - `path`: Path of the resulting bundle.  Optional if the path will never be used (e.g. bundling into HTML after)

## Also see

 - [`pull-files`](https://npmjs.com/pull-files) for reading and writing files
 - [`pull-bundle-html`](https://github.com/jamen/pull-bundle-html) put your JS and CSS into a boilerplate HTML file
 - [`pull-minify-js`](https://github.com/jamen/pull-minify-js) to minify it

