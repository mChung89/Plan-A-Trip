const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const port = 3000

//Connect DB
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser: true},
    () => console.log('connected to db!'))


const app = express()

app.use(express.json())

app.use('/', require('./routes/authRoute'))
app.use('/itinerary', require('./routes/itineraryRoute'))
app.use('/places', require('./routes/placeRoute'))
// app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port: ${port}`))