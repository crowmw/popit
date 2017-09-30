const mongoose = require('mongoose')
const Schema = mongoose.Schema

const popperSchema = new Schema({
  color: { type: 'string', default: '#ffffff' }
})

module.exports = mongoose.model('popper', popperSchema)
