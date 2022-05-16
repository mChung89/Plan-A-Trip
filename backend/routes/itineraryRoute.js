const express = require('express')
const router = express.Router()
const { getItinerary, postItinerary, updateItinerary, deleteItinerary } = require('../controllers/itineraryController')


router.get('/', getItinerary)

// router.post('/', postItinerary)

router.patch('/:id', updateItinerary)

router.delete('/:id', deleteItinerary)

function verifyToken(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        //Split at the space. BearerHeader = Authorization: Bearer <access_token>
        const bearer = bearerHeader.split(' ')
        // Get token from array
        const bearerToken = bearer[1]
        //Set the token
        req.token = bearerToken;
        //Next middleware
        next();
    } else {
        //Forbidden
        res.sendStatus(403)
    }
}

module.exports = router