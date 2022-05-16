const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = 3000


const app = express()

app.use(express.json())
app.use(express.json())

app.use('/api/itinerary', require('./routes/itineraryRoute'))
app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port: ${port}`))