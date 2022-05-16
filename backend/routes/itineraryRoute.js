const express = require('express')
const router = express.Router()
const { getItinerary, postItinerary, updateItinerary, deleteItinerary } = require('../controllers/itineraryController')

router.get('/', getItinerary)

router.post('/', postItinerary)

router.patch('/:id', updateItinerary)

router.delete('/:id', deleteItinerary)

module.exports = router