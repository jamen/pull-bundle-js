
const test = require('tape')
const pull = require('pull-stream')
const { drain, through } = pull
const { read } = require('pull-files')
const bundle = require('../')

test('bundles files', t => {
  t.plan(2)

  pull(
    read(['../index.js', '../test/index.js'], { cwd: __dirname }),
    through(console.log),
    bundle(__dirname + '/out/index.js'),
    // through(console.log),
    drain(bundle => {
      t.true(bundle, 'got bundle')
      console.log(bundle)
    }, err => {
      t.false(err && err.message, 'stream ended normally')
    })
  )  
})
