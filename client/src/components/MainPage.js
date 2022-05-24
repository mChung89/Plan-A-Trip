import Grid from "@mui/material/Grid";
import Map from "./Map";
import Itinerary from "./Itinerary";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import ItineraryHeadCard from "./ItineraryHeadCard";
import ItineraryCard from "./ItineraryCard";
import { useLoadScript } from '@react-google-maps/api'

const libraries = ["places"]

function MainPage() {
  const [itinerary, setItinerary] = useState([]);
  const [tripId, setTripId] = useState("6287eac92bfe37305ebfb47d");


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    libraries
  });

  useEffect(() => {
    fetch(`trip/${tripId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setItinerary(data[0]);
        setTripId(data[1])
      });
  }, []);

  async function addToItinerary(place, itineraryId) {

    console.log("ItineraryId:",itineraryId);
    fetch(`/itinerary/${itineraryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    })
      .then((res) => res.json())
      .then((data) => {
        const findItinerary = itinerary.find(each => each._id = data._id)
        findItinerary.places = [...findItinerary.places, data]
        const newItinerary = itinerary.map(each=> each._id === findItinerary._id ? findItinerary : each)
        setItinerary(newItinerary);
      });
  }

  function deleteFromItinerary(placeId, index) {
        // Filter out from state
        const newItinerary = itinerary[index].places.filter(place => place._id !== placeId)
        const updateItinerary = [...itinerary]
        updateItinerary[index].places = newItinerary
        setItinerary(updateItinerary);
  }

  const mappedItineraryDates = itinerary?.map((date, index) => {
    return (
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        key={date._id}
      >
        {date?.places[0] ? <ItineraryHeadCard key={date._id} date={date}/> : null}
        {date?.places.map((place) => {
          return <ItineraryCard key={place._id} index={index} itineraryId={date._id} deleteFromItinerary={deleteFromItinerary} place={place} />;
        })}
      </Grid>
    );
  });

  return (
    <Grid container className="main-window">
      <Grid item xs={5} px={3} className="itinerary main-window-split">
        <Itinerary itinerary={itinerary} tripId={tripId} addToItinerary={addToItinerary} isLoaded={isLoaded}/>
        {mappedItineraryDates}
      </Grid>
      <Grid pl={4} item xs={7}>
        <Paper className="main-window-split map">
          {/* <div className='map-container-hidden'></div> */}
          <Map
            isLoaded={isLoaded}
            loadError={loadError}
            itinerary={itinerary}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MainPage;
