const npm = require('npm')
const path = require('path')
const parallel = require('run-parallel')
const parseAuthors = require('parse-authors')


module.exports = function addOwners () {

  npm.load({global: false}, (err, _) => {
    if (err) console.error(err)

    npm.commands.owner(['ls'], (err, owners) => {
      if (err) console.error(err)

      const maintainers = loadMaintainers()
      const ownerNames = owners.map(o => o.name)
      const missingFromNpm = maintainers.filter(isMissingFrom(ownerNames))


      console.log('prefix', npm.config.get('global'), npm.globalPrefix, npm.localPrefix)
      console.log({ ownerNames, missingFromNpm})

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

function loadMaintainers () {
  const package = require(path.join(npm.localPrefix, 'package.json'))

  const m = package.maintainers
    .map(m => typeof m === 'string'
      ? parseAuthors(m)[0].name
      : m.name
     )
     .filter(Boolean)

  if (!maintainers)
    throw new Error("there were no maintainers with paresable usernames")

  return m
}

function isMissingFrom (arr) {
  return (el) => arr.indexOf(el) < 0
}

