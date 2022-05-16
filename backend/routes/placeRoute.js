const express = require('express')
const router = express.Router()
const { getItinerary, postPlace, updateItinerary, deleteItinerary } = require('../controllers/placeController')
const verify = require('./verifyToken')


router.get('/', verify, getItinerary)

router.post('/', postPlace)

router.patch('/:id', updateItinerary)

router.delete('/:id', deleteItinerary)

module.exports = router