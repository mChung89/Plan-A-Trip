import Grid from "@mui/material/Grid";
import Map from "./Map";
import Itinerary from './Itinerary'
import { useState, useEffect } from 'react'

function Home() {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [itinerary, setItinerary] = useState(null)

  useEffect(()=> {
    fetch('/itinerary/6283e8c5bfb9da57d3e8d9f3')
    .then(res => res.json())
    .then(data => {
        setItinerary(data)})
},[])
  return (
    <Grid container>
      <Grid item xs={6} className="itinerary">
          <Itinerary setItinerary={setItinerary} currentLocation={currentLocation} itineraryId={itinerary?.itineraryId} itinerary={itinerary?.placesData}/>
      </Grid>
      <Grid item xs={6}>
        <Map setCurrentLocation={setCurrentLocation}/>
      </Grid>
    </Grid>
  );
}

export default Home;
