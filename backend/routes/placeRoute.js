const express = require('express')
const router = express.Router()
const { getPlace, postPlace, updateItinerary, deleteItinerary } = require('../controllers/placeController')
const verify = require('./verifyToken')


router.get('/', verify, getPlace)

router.post('/', postPlace)

router.patch('/:id', updateItinerary)

router.delete('/:id', deleteItinerary)

module.exports = router