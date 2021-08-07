const mongoose = require('mongoose')

const forcastSchema = mongoose.Schema({
    location: String,
    degree: Number,
    forcast: String,
    date: { type: Date, default: Date.now }
}, { timestamps: true })

module.exports = mongoose.model('Forcast',forcastSchema)