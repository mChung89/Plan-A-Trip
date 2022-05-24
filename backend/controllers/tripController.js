const Trip = require('../model/Trip')
const Itinerary = require('../model/Itinerary')
const Place = require('../model/Place')

const showTrip = async (req,res) => {
    const getData = await Trip.findById(req.params._id)
    console.log(getData._id)
    const itineraryData = await Itinerary.find({_id: { $in: getData.itineraries}})
    console.log(itineraryData)
    // const placesData = await Place.find({place_id : { $in: itineraryData.places}})
    res.status(201).send([itineraryData, getData._id])
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

const updateTrip = async (req,res) => {
    const updatedTrip = await Trip.findOneAndUpdate({_id: req.params._id}, {startDate: req.body.startDate, endDate: req.body.endDate})
    const trip = await Trip.findById(req.params._id)
    const itineraryData = await Itinerary.find({_id: { $in: trip.itineraries}})
    const { startDate, endDate } = updatedTrip
    console.log(startDate, endDate)

    // console.log(itineraryData.filter(itinerary => itinerary.date))
}

module.exports = {
    showTrip,
    postTrip,
    updateTrip
}