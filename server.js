const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const cors = require('cors')
const morgan = require('morgan')
const sockets = require('./sockets')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const seedDatabase = require('./src/utils/seedDatabase')

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())
app.use(express.static(`${__dirname}/public`))

const options = {
  useMongoClient: true
}
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/popit', options)

const db = mongoose.connection
db.on('error', () => {
  console.error('FAILED to connect to mongo database')
})
db.once('open', () => {
  console.log('Connected to mongo database')
})

seedDatabase

sockets(io)

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
