const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cordLng: {
        type: Number,
        required: true
    },
    cordLat: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Places', PlaceSchema)