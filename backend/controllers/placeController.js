const Place = require("../model/Place");
// This is for interacting with mongoDB
// because we get a promise when interacting with Mongo
// const asyncHandler = require('express-async-handler')
// @desc        Get User Itinerary
// @route       GET /api/itinerary
// @access      Private
const getItinerary = async (req, res) => {
  res.status(200).json({ user: req.user });
};

// @desc        Set User Itinerary
// @route       POST /api/itinerary
// @access      Private
const postPlace = async (req, res) => {
  let newPlace;
  //Check if Place exists in database
  const placeExist = await Place.findOne({ name: req.body.name });
  if (placeExist) {
    newPlace = placeExist
    res.status(200).send(placeExist)
  }

  //Create the User
  newPlace = new Place({
    name: req.body.name,
    description: req.body.description,
    cordLng: req.body.cordLng,
    cordLat: req.body.cordLat
  });

  //Create User in DB
  try {
    const savedPlace = await newPlace.save();
    res.status(201).send(savedPlace);
  } catch (err) {
    res.status(400).send(err);
  }
};

// @desc        Update User Itinerary
// @route       PATCH /api/itinerary/:id
// @access      Private
const updateItinerary = async (req, res) => {
  res
    .status(200)
    .json({ message: `Updating itinerary at ID:${req.params.id}` });
};

// @desc        Delete Itinerary
// @route       DELETE /api/itinerary/:id
// @access      Private
const deleteItinerary = async (req, res) => {
  res.status(200).json({ message: `Deleting itinerary ID:${req.params.id}` });
};

module.exports = {
  getItinerary,
  postPlace,
  updateItinerary,
  deleteItinerary,
};
