const express = require('express')
const router = express.Router()
const { getItinerary, postItinerary, showItinerary, deleteItineraryPlace, updateItinerary } = require('../controllers/itineraryController')
const verify = require('../middleware/verifyToken')

router.get('/', verify, getItinerary)

router.get('/:_id', verify, showItinerary)

router.post('/', postItinerary)

router.patch('/:_id', updateItinerary)

router.delete('/:itineraryId/:placeId', deleteItineraryPlace)

module.exports = router