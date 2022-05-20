const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema ({
    itineraryInfo: {
        type: Object,
        required: true
    },
    places: {
        type: Array
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Itinerary', itinerarySchema)