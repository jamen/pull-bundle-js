
const { asyncMap, filter } = require('pull-stream')
const { extname, join } = require('path')
const browserify = require('browserify')

module.exports = bundle

function bundle (settings, transform) {
  // Shorthand `bundle(dest, transforms)` usage:
  if (typeof settings === 'string') {
    settings = { dest: settings }
    if (transform) {
      settings.transform = transform
    }
  }
  
  // Settings
  const dest = settings.dest
  const pass = settings.pass !== undefined ? settings.pass : true
  const base = typeof dest === 'object' ? dest.base : null
  const path = typeof dest === 'object' ? dest.path : dest
  const b = browserify(settings)
  let sent = false

  // Bundler stream
  return function reader (read) {
    return function write (end, cb) {
      read(end, function (end, file) {
        if (!sent && end === true) {
          b.bundle((err, data) => {
            if (err) return cb(err)
            sent = true
            cb(null, { base, path, data })
          })
        } else if (end) {
          return cb(end)
        } else {
          if (extname(file.path) === '.js') {
            b.add(file.base ? join(file.base, file.path) : file.path)
          } else if (pass) {
            cb(null, file)
          }
          write(null, cb)
        }
      })
    }
  }
}
