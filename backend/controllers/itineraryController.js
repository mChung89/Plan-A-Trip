const Itinerary = require("../model/Itinerary");
const Place = require('../model/Place')

const getItinerary = async (req, res) => {
    const getData = await Itinerary.find()
    res.status(200).send(getData)
}

const showItinerary = async (req, res) => {
    const getData = await Itinerary.findById(req.params._id)
    // const placesData = await Place.find({place_id: { $in: getData.places}})
    const placesData = await Place.find({ place_id: { $in: getData.places } })
    try {
        res.status(200).send({ placesData: placesData, itineraryDateId: getData._id })
    } catch(err) {
        res.status(400).send(err)
    }
}

const updateItinerary = async (req, res) => {
    //Check if Place exists in database
    let place = await Place.findOne({ place_id: req.body.place_id });

    // If Place does not exist, create the Place
    if (!place) {
        place = new Place({
            name: req.body.name,
            place_id: req.body.place_id,
            lat: req.body.lat,
            lng: req.body.lng,
            formatted_address: req.body.formatted_address,
            opening_hours: req.body.opening_hours,
            photos: req.body.photos,
            website: req.body.website
        });

        const newPlaceInstance = await place.save()
        // Inserting place into itinerary
        const updatedItinerary = await Itinerary.findById(req.params._id)
        const newItinerary = await Itinerary.findByIdAndUpdate(req.params._id, { places: [...updatedItinerary.places, place] })
        try {
            res.status(201).send(newPlaceInstance)
        } catch (err) {
            res.status(400).send(err)
        }
    }

    // Inserting place into itinerary
    const updatedItinerary = await Itinerary.findById(req.params._id)
    const newItinerary = await Itinerary.findByIdAndUpdate(req.params._id, { places: [...updatedItinerary.places, place] })

    try {
        res.status(201).send(place)
    } catch (err) {
        res.status(400).send(err);
    }
}

const postItinerary = async (req, res) => {
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
        const place = await Place.findOne({ _id: req.params.placeId })
        const newItinerary = await Itinerary.findByIdAndUpdate({ _id: req.params.itineraryId }, {
            $pull: {
                places: { _id: place._id }
            }
        })
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