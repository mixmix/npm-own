const npm = require('npm')
const parallel = require('run-parallel')
const parseAuthors = require('parse-authors')
const package = require('./package.json')

const maintainers = package.maintainers
  .map(m => typeof m === 'string'
    ? parseAuthors(m)[0].name
    : m.name
   )
   .filter(Boolean)


module.exports = function addOwners () {
  if (!maintainers)
    throw new Error("there were no maintainers with paresable usernames")

  npm.load({}, (err, _) => {
    if (err) console.error(err)

    npm.commands.owner(['ls'], (err, owners) => {
      if (err) console.error(err)

      const ownerNames = owners.map(o => o.name)
      const missingFromNpm = maintainers.filter(isMissingFrom(ownerNames))

      parallel(
        missingFromNpm.map(m => (cb) =>  npm.commands.owner(['add', m], cb) ),
        (err, data) => {
          if (err) console.error(err)

          console.log('DONE')
        }
      )
    })
  })
}

function isMissingFrom (arr) {
  return (el) => arr.indexOf(el) < 0
}

