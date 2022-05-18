import Grid from "@mui/material/Grid";
import Map from "./Map";
import Itinerary from './Itinerary'
import { useState, useEffect } from 'react'

function Home() {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [itinerary, setItinerary] = useState([])

  return (
    <Grid container className='main-window'>
      <Grid item xs={5} className="itinerary main-window-split">
        <Itinerary setItinerary={setItinerary} currentLocation={currentLocation} itinerary={itinerary} />
      </Grid>
      <Grid item xs={7} className="main-window-split">
        <Map setCurrentLocation={setCurrentLocation} />
      </Grid>
    </Grid>
  );
}

export default Home;
