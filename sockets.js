module.exports = io => {
  io.on('connection', socket => {
    console.log('Client connected')
    socket.on('popper-click', msg => {
      console.log(`Received message: ${msg}`)
      io.emit('popper-clicked', msg)
    })
  })
}
