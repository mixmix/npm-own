var npm = require('npm')

npm.load()

npm.command.owner(['ls'], function (err, data) {
  if (err) console.log(err)

  console.log('Current owners:', data)
})

