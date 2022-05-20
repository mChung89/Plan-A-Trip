const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema ({
    name: {
        type: String,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date
    },
    itineraries: {
        type: Array,
    }
})

module.exports = mongoose.model('Trip', tripSchema)