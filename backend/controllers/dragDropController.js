const Itinerary = require('../model/Itinerary')

const updateOneDate = async (req, res) => {
    const updateItinerary = await Itinerary.findByIdAndUpdate(req.body.id, {places: req.body.reordered},{returnOriginal: false})
    res.status(200).send(updateItinerary)
}

const updateTwoDates = async (req, res) => {
    const updateFirst = await Itinerary.findByIdAndUpdate(req.body.firstDate.id,{places: req.body.firstDate.reordered},{returnOriginal: false})
    const updateSecond = await Itinerary.findByIdAndUpdate(req.body.secondDate.id,{places: req.body.secondDate.reordered},{returnOriginal: false})
    res.status(200).send([updateFirst,updateSecond])
}

module.exports = {
    updateOneDate,
    updateTwoDates
  };
  