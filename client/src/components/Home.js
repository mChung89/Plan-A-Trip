import Grid from "@mui/material/Grid";
import Map from "./Map";
import Itinerary from './Itinerary'
import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'

function Home() {
  const [currentLocation, setCurrentLocation] = useState(null)
  const [itinerary, setItinerary] = useState([])
  const [itineraryId, setItineraryId] = useState(null)

  useEffect(() => {
      fetch('/itinerary/62852f23709c2589eb3de201')
      .then(res => res.json())
      .then(data => {
          setItinerary(data.placesData)
          setItineraryId(data.itineraryId)
      })
    }, [])

    async function addToItinerary (place) {
      // const token = localStorage.getItem('user')
      fetch(`/itinerary/${itineraryId}`,{
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(place)
      })
      .then(res => res.json())
      .then(data => {
          setItinerary([...itinerary, data])
  })}

  return (
    <Grid container className='main-window'>
      <Grid item xs={5} px={3} className="itinerary main-window-split">
        <Itinerary itineraryId={itineraryId} setItinerary={setItinerary} currentLocation={currentLocation} itinerary={itinerary} />
      </Grid>
      <Grid pl={4} item xs={7}>
      <Paper className='main-window-split map'>
        <Map itinerary={itinerary} itineraryId={itineraryId} addToItinerary={addToItinerary} setCurrentLocation={setCurrentLocation} />
      </Paper>
      </Grid>
    </Grid>
  );
}

export default Home;
