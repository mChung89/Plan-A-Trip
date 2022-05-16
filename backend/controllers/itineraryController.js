// This is for interacting with mongoDB
// because we get a promise when interacting with Mongo
// const asyncHandler = require('express-async-handler')
// @desc        Get User Itinerary
// @route       GET /api/itinerary
// @access      Private
const getItinerary = async (req, res) => {
    res.status(200).json({message: "Getting itinerary"})
}

// @desc        Set User Itinerary
// @route       POST /api/itinerary
// @access      Private     
const postItinerary = async (req, res) => {
    if (!req.body) {
        res.status(400)
        throw new Error('Please add something')
    }
    console.log(req)
    res.status(200).json({message: `Posting ${req.body.title} to new itinerary`})
}

// @desc        Update User Itinerary
// @route       PATCH /api/itinerary/:id
// @access      Private
const updateItinerary = async (req, res) => {
    res.status(200).json({message: `Updating itinerary at ID:${req.params.id}`})
}

// @desc        Delete Itinerary
// @route       DELETE /api/itinerary/:id
// @access      Private
const deleteItinerary = async (req, res) => {
    res.status(200).json({message: `Deleting itinerary ID:${req.params.id}`})
}

module.exports = {
    getItinerary,
    postItinerary,
    updateItinerary,
    deleteItinerary
}