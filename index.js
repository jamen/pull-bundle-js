
var { asyncMap, filter } = require('pull-stream')
var { extname, join } = require('path')
var browserify = require('browserify')

module.exports = bundle

function bundle (path, options) {
  // Fix bundle(options) usage
  if (!options) {
    options = path
    path = null
  }

  // Fix bundle(path?, transforms) shorthand
  if (Array.isArray(options)) {
    options = { transform: options }
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
          b.add(file.base ? join(file.base, file.path) : file.path)
          write(null, cb)
        }
      })
    }
  }
}

