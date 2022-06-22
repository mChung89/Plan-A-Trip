const Itinerary = require('../model/Itinerary')

const updateOneDate = async (req, res) => {
    const updateItinerary = await Itinerary.findByIdAndUpdate(req.body.id, {places: req.body.reordered},{returnOriginal: false})
    try {
        res.status(200).send(updateItinerary)
    } catch(err) {
        res.status(400).send(err)
    }
}

const updateTwoDates = async (req, res) => {
    const updateFirst = await Itinerary.findByIdAndUpdate(req.body.firstDate.id,{places: req.body.firstDate.reordered},{returnOriginal: false})
    const updateSecond = await Itinerary.findByIdAndUpdate(req.body.secondDate.id,{places: req.body.secondDate.reordered},{returnOriginal: false})
    try {
        res.status(200).send([updateFirst,updateSecond])
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = {
    updateOneDate,
    updateTwoDates
  };
  