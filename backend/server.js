const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const cors = require('cors')

//Connect DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to db!")
);

const app = express();


app.use(express.json());
app.use(cors())

//middleware for cookies
app.use(cookieParser());

// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "../client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Routes

app.use("/api/trip", require("./routes/tripRoute"));
app.use("/api/itinerary", require("./routes/itineraryRoute"));
app.use("/api/places", require("./routes/placeRoute"));
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/refresh", require("./routes/refreshRoute"));
app.use("/api/logout", require("./routes/logoutRoute"));
app.use('/api/dnd', require('./routes/dragDropRoute'))

// app.use(errorHandler)
app.listen(process.env.PORT || 5000, () => console.log(`Server started on port: ${process.env.PORT}!`));
