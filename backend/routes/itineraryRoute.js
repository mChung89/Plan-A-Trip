const express = require('express')
const router = express.Router()
const { getItinerary, postItinerary, showItinerary, deleteItinerary } = require('../controllers/itineraryController')
const verify = require('./verifyToken')

router.get('/', getItinerary)

router.get('/:_id', showItinerary)

router.post('/', postItinerary)

// router.patch('/:id', updateItinerary)

router.delete('/:id', deleteItinerary)

module.exports = router