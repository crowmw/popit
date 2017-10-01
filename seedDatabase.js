const Poppers = require('./models/popperSchema')
const POPPERS_COUNT = 277

const popperSeed = () => {
  Poppers.count((err, count) => {
    if (err) return console.error(err)
    if (count === 0) {
      console.log('Seed poopers')
      let poppers = []
      for (let index = 1; index < POPPERS_COUNT; index++) {
        poppers.push({ color: '#ffffff' })
      }
      for (popper of poppers) {
        let newPopper = Poppers(popper)
        newPopper.save(err => {
          if (err) console.error(err)
        })
      }
    }
  })
}

const seedDatabase = () => {
  popperSeed()
}

module.exports = seedDatabase
