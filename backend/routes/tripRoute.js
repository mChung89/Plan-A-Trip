const express = require('express')
const router = express.Router()
const { showTrip, postTrip, updateTrip } = require('../controllers/tripController')
const verify = require('../middleware/verifyToken')


router.get('/:_id', showTrip)
router.post('/', postTrip)

// router.get('/', getItinerary)
// router.post('/', postItinerary)

router.patch('/:_id', updateTrip)

// router.delete('/:itineraryId/:placeId', deleteItineraryPlace)

module.exports = router