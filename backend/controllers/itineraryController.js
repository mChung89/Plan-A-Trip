const Itinerary = require("../model/Itinerary");
const Place = require('../model/Place')

const getItinerary = async (req, res) => {
    const getData = await Itinerary.find()
    res.status(200).send(getData)
}

const showItinerary = async (req, res) => {
    const getData = await Itinerary.findById(req.params._id)
    const placesData = await Place.find({place_id: { $in: getData.places}})
    res.status(200).send({placesData:placesData, itineraryId: getData._id})
}

const updateItinerary = async (req,res) => {
    const updatedItinerary = await Itinerary.findByIdAndUpdate(req.params._id, {places: req.body.newPlaces})
    const placesData = await Place.find({place_id: { $in: updatedItinerary.places}})
    console.log('updating')
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

const deleteItineraryPlace = async (req, res) => {
    try {
        console.log(req.params.itineraryId)
        const itinerary = await Itinerary.findOne({_id: req.params.itineraryId})
        console.log(itinerary.places)
        const places = itinerary.places.filter(place => place !== req.params.placeId)
        console.log('Places:', places)
        const newItinerary = await Itinerary.findByIdAndUpdate(req.params.itineraryId, {places: places})
        console.log("Itinerary:", newItinerary.places)
        res.status(201).send(newItinerary)
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = {
    getItinerary,
    showItinerary,
    postItinerary,
    updateItinerary,
    deleteItineraryPlace
}