const express = require('express')
const router = express.Router()
const { showTrip, postTrip, addDates, trimDates, addUserToTrip } = require('../controllers/tripController')
const verify = require('../middleware/verifyToken')


router.get('/:_id', showTrip)
router.post('/', postTrip)

// router.get('/', getItinerary)
// router.post('/', postItinerary)
router.patch('/addusertotrip/:_id', addUserToTrip)
router.patch('/:_id', addDates)
router.patch('/:_id/trim', trimDates)

// router.delete('/:itineraryId/:placeId', deleteItineraryPlace)

module.exports = router