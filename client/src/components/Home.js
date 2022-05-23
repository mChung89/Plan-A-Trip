import Grid from "@mui/material/Grid";
import Map from "./Map";
import Itinerary from "./Itinerary";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import ItineraryHeadCard from "./ItineraryHeadCard";
import ItineraryCard from "./ItineraryCard";
import { useLoadScript } from '@react-google-maps/api'

const libraries = ["places"]

function Home() {
  const [itinerary, setItinerary] = useState([]);
  const [itineraryId, setItineraryId] = useState("6287e3bff4a1041d6fb45f55");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    libraries
  });

  useEffect(() => {
    fetch("trip/6287eac92bfe37305ebfb47d")
      .then((res) => res.json())
      .then((data) => {
        setItinerary(data);
        // setItineraryId(data.itineraryId)
      });
  }, []);

  async function addToItinerary(place, index) {
    console.log("ItineraryId:",itineraryId);
    fetch(`/itinerary/${itineraryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place, index),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(index)
        const newItinerary = [...itinerary]
        newItinerary[index].places = [...itinerary[index].places, data]
        setItinerary(newItinerary);
      });
  }
  console.log("Current Itinerary", itinerary)

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
        <Itinerary itinerary={itinerary} addToItinerary={addToItinerary} isLoaded={isLoaded}/>
        {mappedItineraryDates}
      </Grid>
      <Grid pl={4} item xs={7}>
        <Paper className="main-window-split map">
          <div className='map-container-hidden'></div>
          {/* <Map
            isLoaded={isLoaded}
            loadError={loadError}
            itinerary={itinerary}
            itineraryId={itineraryId}
            addToItinerary={addToItinerary}
          /> */}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Home;
