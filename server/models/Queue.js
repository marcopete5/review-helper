const mongoose = require('mongoose')
const Schema = mongoose.Schema

const queueSchema = new Schema({
    queue: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Queue', queueSchema)