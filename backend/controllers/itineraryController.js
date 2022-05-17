const Itinerary = require("../model/Itinerary");
const Place = require('../model/Place')

const getItinerary = async (req, res) => {
    const getData = await Itinerary.find()
    res.status(200).send(getData)
}

const showItinerary = async (req, res) => {
    const getData = await Itinerary.findById(req.params._id)
    const placesData = await Place.find({place_id: { $in: getData.places}})
    res.status(200).send(placesData)
}

const updateItinerary = async (req,res) => {
    const updatedItinerary = await Itinerary.findByIdAndUpdate(req.params._id, {places: req.body.newPlaces})
    const placesData = await Place.find({place_id: { $in: updatedItinerary.places}})
    res.status(201).send(placesData)
}

const postItinerary = async (req,res) => {
    const newItinerary = new Itinerary({
        itineraryInfo: req.body.itineraryInfo,
        dates: req.body.dates,
        places: req.body.places,
    })

    try {
        const savedItinerary = await newItinerary.save();
        res.status(201).send(savedItinerary);
      } catch (err) {
        res.status(400).send(err);
      }
}

const deleteItinerary = async (req, res) => {
    try {
        Itinerary.deleteOne({_id: req.body._id})
        res.status(201).json({message: "Deleted"})
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = {
    getItinerary,
    showItinerary,
    postItinerary,
    updateItinerary,
    deleteItinerary
}