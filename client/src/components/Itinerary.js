import ItineraryCard from "./ItineraryCard";
import Grid from "@mui/material/Grid";
function Itinerary({ itinerary, setItinerary, itineraryId }) {
  function addToItinerary(place) {
    // const token = localStorage.getItem('user')
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

  function deleteFromItinerary(placeId) {
    setItinerary(itinerary.filter((place) => place.place_id !== placeId));
  }

  const renderItinerary = itinerary?.map((place) => (
    <ItineraryCard
      key={place._id}
      place={place}
      itineraryId={itineraryId}
      deleteFromItinerary={deleteFromItinerary}
    />
  ));

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
    >
      {renderItinerary}
    </Grid>
  );
}

export default Itinerary;
