
var pull = require('pull-stream')

pull(
  pull.values([ 1, 2, 3 ]),
  pull.map(x => x * 3),
  pull.log()
)

