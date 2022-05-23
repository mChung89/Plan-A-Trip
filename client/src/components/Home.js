import Grid from "@mui/material/Grid";
import Map from "./Map";
import Itinerary from "./Itinerary";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import ItineraryHeadCard from "./ItineraryHeadCard";
import ItineraryCard from "./ItineraryCard";

function Home() {
  const [itinerary, setItinerary] = useState([]);
  const [itineraryId, setItineraryId] = useState("6287e3bff4a1041d6fb45f55");

  useEffect(() => {
    fetch("trip/6287eac92bfe37305ebfb47d")
      .then((res) => res.json())
      .then((data) => {
        setItinerary(data);
        // setItineraryId(data.itineraryId)
      });
  }, []);

  function addToItinerary(place) {
    console.log(place);
    fetch(`/itinerary/${itineraryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    })
      .then((res) => res.json())
      .then((data) => {
        setItinerary([...itinerary, data]);
      });
  }

  function deleteFromItinerary(placeId, index) {
    const newItinerary = itinerary[index].places.filter(place => place._id !== placeId)
    const updateItinerary = [...itinerary]
    updateItinerary[index].places = newItinerary
    setItinerary(updateItinerary);
  }

  console.log(itinerary)

  const mappedItineraryDates = itinerary?.map((date, index) => {
    return (
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <ItineraryHeadCard date={date} />
        {date.places.map((place) => {
          return <ItineraryCard index={index} itineraryId={date._id} deleteFromItinerary={deleteFromItinerary} place={place} />;
        })}
      </Grid>
    );
  });

  return (
    <Grid container className="main-window">
      <Grid item xs={5} px={3} className="itinerary main-window-split">
        {mappedItineraryDates}
      </Grid>
      <Grid pl={4} item xs={7}>
        <Paper className="main-window-split map">
          <div className='map-container-hidden'></div>
          {/* <Map
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
