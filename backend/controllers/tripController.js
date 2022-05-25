const Trip = require('../model/Trip')
const Itinerary = require('../model/Itinerary')
const Place = require('../model/Place')

const showTrip = async (req,res) => {
    if(req.params._id === 'null') {
      return res.status(400).send({errors: "No tripId sent"})
    }
    const getData = await Trip.findById(req.params._id)
    const itineraryData = await Itinerary.find({_id: { $in: getData.itineraries}}).sort({date: 1})
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
  //Need to get a list of all existing itinerary dates
  console.log(req.body.dates);
  const newItineraryDates = async () => {
    return Promise.all(
      req.body.dates.map((each) => {
        const itinerary = new Itinerary({
          itineraryInfo: {},
          places: [],
          date: each,
        });
        const saved = itinerary.save();
        return saved;
      })
    );
  };
  const newDates = await newItineraryDates();
  const mapIds = newDates.map(each => each._id)
  const updatedTrip = await Trip.findOneAndUpdate(
    { _id: req.params._id },
    { $push: { itineraries: { $each: mapIds}}}
  );
  const itineraryData = await Itinerary.find({_id: { $in: updatedTrip.itineraries}}).sort({date: 1})
  res.status(200).send(itineraryData)
}

module.exports = {
    showTrip,
    postTrip,
    updateTrip
}