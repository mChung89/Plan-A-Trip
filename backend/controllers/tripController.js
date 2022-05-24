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
    //Need to get a list of all existing itinerary dates
    const mapped = []
    const itineraryData = await (await Itinerary.find({_id: { $in: updatedTrip.itineraries}})).map(each => each)
    const existingDates = mapped.map(each => each)
    console.log(itineraryData)
    // Get start dates & end dates.
    const { startDate, endDate } = updatedTrip
    const formatStart = new Date(startDate)
    const formatEnd = new Date(endDate)
    // See how many days in between to determine loop
    const difference = (formatEnd.getTime() -formatStart.getTime()) / (1000*60*60*24)
    const newItinerary = []
    for(i=0; i < difference; i++) {
        newItinerary.push(formatStart.getTime() + (i * (1000*60*60*24)))
    }
    console.log(newItinerary)
}

module.exports = {
    showTrip,
    postTrip,
    updateTrip
}