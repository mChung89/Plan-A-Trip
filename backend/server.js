const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const port = 3000
const cookieParser = require('cookie-parser')

//Connect DB
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser: true},
    () => console.log('connected to db!'))


const app = express()

app.use(express.json())

//middleware for cookies
app.use(cookieParser())

app.use('/trip', require('./routes/tripRoute'))
app.use('/itinerary', require('./routes/itineraryRoute'))
app.use('/places', require('./routes/placeRoute'))
app.use('/', require('./routes/authRoute'))
app.use('/refresh', require('./routes/refreshRoute'))
app.use('/logout', require('./routes/logoutRoute'))

// app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port: ${port}`))