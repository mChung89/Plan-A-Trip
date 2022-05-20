import ItineraryCard from "./ItineraryCard";
import Grid from "@mui/material/Grid";
import ItineraryHeadCard from "./ItineraryHeadCard";

function Itinerary({ itinerary, setItinerary, itineraryId }) {

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
      <ItineraryHeadCard/>
      {renderItinerary}
    </Grid>
  );
}

export default Itinerary;
