const Trip = require('../model/Trip')
const Itinerary = require('../model/Itinerary')
const User = require('../model/User')

const showTrip = async (req, res) => {
  if (req.params._id === 'null') {
    return res.status(400).send({ errors: "No tripId sent" })
  }
  try {
    const getData = await Trip.findById(req.params._id)
    const itineraryData = await Itinerary.find({ _id: { $in: getData.itineraries } }).sort({ date: 1 })
    res.status(201).send([itineraryData, getData._id])
  } catch (err) {
    res.status(400).send(err)
  }
}

const postTrip = async (req, res) => {
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
  //Make new itineraries and get ids to place in new Trip
  const newDates = await newItineraryDates();
  const mapIds = newDates.map(each => each._id)

  //Make a trip document and add itinerary date document references
  const tripData = new Trip({
    name: req.body.tripName,
    itineraries: mapIds
  });
  const newTrip = await tripData.save()

  // Associate the new trip to user
  try {
    if(req.body.userId) {
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { itineraries: { tripName: req.body.tripName, tripId: newTrip._id } } },
      { returnOriginal: false }
    )
    res.status(201).send({ updatedUser: user, newTrip: newTrip })
    } else {
      res.status(201).send({newTrip: newTrip})
    }
  } catch (err) {
    res.status(400).send(err)
  }
}

//Add dates
const addDates = async (req, res) => {
  //Need to get a list of all existing itinerary dates
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
    { $push: { itineraries: { $each: mapIds } } },
    { returnOriginal: false }
  );
  try {
    const itineraryData = await Itinerary.find({ _id: { $in: updatedTrip.itineraries } }).sort({ date: 1 })
    res.status(200).send(itineraryData)
  } catch (err) {
    res.status(400).send(err)
  }
}

const trimDates = async (req, res) => {
  // Delete the itinerarie dates
  const itineraryDatesDelete = req.body.idsToDelete.map(each => each._id)
  await Itinerary.deleteMany({ _id: { $in: itineraryDatesDelete } })
  //Get the trip
  const mappedIds = req.body.dates.map(each => each._id)
  const updatedTrip = await Trip.findOneAndUpdate(
    { _id: req.params._id },
    { itineraries: mappedIds },
    { returnOriginal: false }
  );
  try {
    const itineraryData = await Itinerary.find({ _id: { $in: updatedTrip.itineraries } }).sort({ date: 1 })
    res.status(200).send(itineraryData)
  } catch (err) {
    res.status(400).send(err)
  }
}

const addUserToTrip = async (req,res) => {
  try {
    console.log(req.body)
    const user = await User.findByIdAndUpdate(req.params._id,
      { $push: { itineraries: { tripId: req.body.currentTrip } } },
      { returnOriginal: false })
      res.status(201).send(user)
  } catch(err) {
    res.status(400).send(err)
  }
}

module.exports = {
  showTrip,
  postTrip,
  addDates,
  trimDates,
  addUserToTrip
}