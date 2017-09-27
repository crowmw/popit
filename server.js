const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('./router')
// const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(`${__dirname}/public`))
router(app)

const server = http.createServer(app)

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
