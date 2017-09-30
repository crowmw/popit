const Poppers = require('../../models/popperSchema')

const popperSeed = () => {
  Poppers.count((err, count) => {
    if (err) return console.error(err)
    if (count === 0) {
      console.log('Seed poopers')
      const poppers = () => {
        let poppers = []
        for (let index = 1; index <= 100; index++) {
          poppers.push({ color: '#ffffff' })
        }
        return poppers
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

module.exports = seedDatabase()
