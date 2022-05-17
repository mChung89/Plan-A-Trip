import Grid from "@mui/material/Grid";
import Map from "./Map";
import Itinerary from './Itinerary'
import { useState } from 'react'

function Home() {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [itinerary, setItinerary] = useState(null)
  return (
    <Grid container>
      <Grid item xs={6} className="itinerary">
          <Itinerary setItinerary={setItinerary} itinerary={itinerary}/>
      </Grid>
      <Grid item xs={6}>
        <Map setCurrentLocation={setCurrentLocation}/>
      </Grid>
    </Grid>
  );
}

export default Home;
