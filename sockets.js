const Popper = require('./models/popperSchema')

module.exports = io => {
  io.on('connection', socket => {
    console.log('Client connected')
    Popper.find({}, (err, poppers) => {
      if (err) return console.error(err)
      let poppersMap = {}
      for (popper of poppers) {
        poppersMap[popper._id] = popper
      }
      socket.emit('init-data', poppersMap)
    })

    socket.on('popper-click', msg => {
      console.log(`Received message: ${JSON.stringify(msg)}`)
      Popper.findOneAndUpdate(
        { _id: msg.id },
        { $set: { color: msg.color, user: msg.user } },
        { new: true },
        (err, popper) => {
          if (err) {
            console.error(`Something wrong when update data! msg: ${JSON.stringify(msg)}`)
          }
          io.emit('popper-clicked', msg)
        }
      )
    })
  })
}
