const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema ({
    name: {
        type: String,
    },
    itineraries: {
        type: Array,
    }
})

module.exports = mongoose.model('Trip', tripSchema)