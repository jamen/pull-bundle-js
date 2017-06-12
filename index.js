
var { asyncMap, filter } = require('pull-stream')
var { extname, join } = require('path')
var browserify = require('browserify')

module.exports = bundle

function bundle (path, options) {
  // fix bundle(options) usage
  if (!options) {
    options = path
    path = null
  }

  options = Object.assign({
    strict: true,
    // maybe others in future
  }, options)

  // Correct path if in options
  if (!path && options.path) {
    path = options.path
  }

  var b = browserify(options)
  var sent = false

  return function (read) {
    return function write (end, cb) {
      read(end, function (end, file) {
        if (!sent && end === true) {
          b.bundle((err, data) => {
            if (err) return cb(err)
            sent = true
            cb(null, { path, data })
          })
        } else if (end) {
          return cb(end)
        } else {
          if (extname(file.path) === '.js') {
            b.add(file.base ? join(file.base, file.path) : file.path)
          } else if (strict) {
            return cb(new Error(`Can only bundle JS files (got ${file.path})`))
          } 
          write(null, cb)
        }
      })
    }
  }
}

