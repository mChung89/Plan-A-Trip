const Place = require("../model/Place");
// This is for interacting with mongoDB
// because we get a promise when interacting with Mongo
// const asyncHandler = require('express-async-handler')
// @desc        Get User Itinerary
// @route       GET /api/itinerary
// @access      Private
const getPlace = async (req, res) => {
  const getData = await Place.find({place_id: { $in: ["ChIJaXQRs6lZwokRY6EFpJnhNNE", "ChIJfSpRxqVZwokRbhDqemhazdA"]}})
  res.status(200).send(getData)
};

const showPlace = async (req,res) => {
    const getData = await Place.findOne({place_id: req.params.place_id})
    getData ? res.status(200).send(getData) : res.status(400).send({error: "Can't be found"})
}

// @desc        Set User Itinerary
// @route       POST /api/itinerary
// @access      Private
const postPlace = async (req, res) => {
  let newPlace;
  //Check if Place exists in database
  const placeExist = await Place.findOne({ place_id: req.body.place_id });
  //Return Found Place if Found
  if (placeExist) {
    newPlace = placeExist
    return res.status(200).send(placeExist)
  }

  //Create the Place
  newPlace = new Place({
    name: req.body.name,
    place_id: req.body.place_id,
    lat: req.body.lat,
    lng: req.body.lng,
    formatted_address: req.body.formatted_address,
    opening_hours: req.body.opening_hours,
    photos: req.body.photos,
    website: req.body.website
  });

  //Create Place in DB
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
  getPlace,
  postPlace,
  showPlace,
  updateItinerary,
  deleteItinerary,
};
