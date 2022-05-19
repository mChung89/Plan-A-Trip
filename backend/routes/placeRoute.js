const express = require('express')
const router = express.Router()
const { getPlace, showPlace, postPlace, updateItinerary, deleteItinerary } = require('../controllers/placeController')
const verify = require('../middleware/verifyToken')


router.get('/', verify, getPlace)

router.get('/:place_id', showPlace)

router.post('/', postPlace)

router.patch('/:id', updateItinerary)

router.delete('/:id', deleteItinerary)

module.exports = router