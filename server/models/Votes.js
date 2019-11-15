const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voteSchema = new Schema({
    topics: Object,
    module: String
})

module.exports = mongoose.model('Vote', voteSchema)