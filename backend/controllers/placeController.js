const Place = require("../model/Place");

const getPlace = async (req, res) => {
  const getData = await Place.find()
  res.status(200).send(getData)
};

const showPlace = async (req,res) => {
    const getData = await Place.findOne({place_id: req.params.place_id})
    getData ? res.status(200).send(getData) : res.status(400).send({error: "Can't be found"})
}

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

const updateItinerary = async (req, res) => {
  res
    .status(200)
    .json({ message: `Updating itinerary at ID:${req.params.id}` });
};

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