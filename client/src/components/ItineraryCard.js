import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Image from "material-ui-image";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography"

function ItineraryCard({ place, itineraryId, deleteFromItinerary, index }) {
  function handleDelete(itineraryId, placeId ,index) {
    fetch(`/itinerary/${itineraryId}/${placeId}`, { method: "DELETE" }).then(
      (res) => deleteFromItinerary(placeId, index)
    );
  }

  return (
    <Grid
      container
      direction="row"
      p={2}
      key={place.id}
      className="place-cards"
    >
      <Paper elevation={4} sx={{ display: "flex", width: "100%" }}>
        <Grid p={2} item xs={8}>
          <Typography variant='h4'>{place.name}</Typography>
          <Typography variant='h6'>{place.formatted_address}</Typography>
          <ul>
            {place.opening_hours?.weekday_text.map((day) => (
              <li key={day}>{day}</li>
            ))}
          </ul>
          <Button>{place.website}</Button>
          <Button onClick={() => handleDelete(itineraryId, place._id, index)}>
            Delete
          </Button>
        </Grid>
        <Grid p={2} item xs={4}>
          <Image imageStyle={{borderRadius: '4px'}} src='asd' alt={place.name} />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default ItineraryCard;
