const Trip = require('../model/Trip')
const Itinerary = require('../model/Itinerary')
const Place = require('../model/Place')

const showTrip = async (req,res) => {
    const getData = await Trip.findById(req.params._id)
    const itineraryData = await Itinerary.find({_id: { $in: getData.itineraries}})
    // const placesData = await Place.find({place_id : { $in: itineraryData.places}})
    getData ? res.status(200).send(itineraryData) : res.status(400).send({error: "Can't be found"})
}

const postTrip = async (req,res) => {
    const tripData = new Trip({
        name: req.body.name,
        startDate : req.body.startDate,
        endDate: req.body.endDate,
        itineraries: req.body.itineraries
    });

    const newTrip = await tripData.save()
    res.status(201).send(newTrip)
}

module.exports = {
    showTrip,
    postTrip
}