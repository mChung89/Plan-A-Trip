const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
    place_id: {
        type: String,
        required: true
    },
    photos: {
        type: Array
    },
    name: {
        type: String,
        required: true
    },
    opening_hours: {
        type: Object,
    },
    website: {
        type: String
    },
    formatted_address: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Places', PlaceSchema)