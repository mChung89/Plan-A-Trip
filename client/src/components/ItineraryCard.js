import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Image from "material-ui-image";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PublicIcon from '@mui/icons-material/Public';
import DeleteIcon from '@mui/icons-material/Delete';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { useDrag } from 'react-dnd'
import { ItemTypes } from './Constants'


function ItineraryCard({ place, itineraryId, deleteFromItinerary, index }) {
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
 

  function handleDelete(itineraryId, placeId, index) {
    fetch(`/itinerary/${itineraryId}/${placeId}`, { method: "DELETE" }).then(
      (res) => deleteFromItinerary(placeId, index)
    );
  }

  return (
    <Grid
    ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
      container
      direction="row"
      p={2}
      key={place.id}
      className="place-cards"
    >
      <Paper elevation={4} sx={{ display: "flex", width: "100%" }}>
        <Grid p={2} item xs={8}>
          <Typography variant="h4">{place.name}</Typography>
          <Typography variant="h6">{place.formatted_address}</Typography>
          <ul>
            {place.opening_hours?.weekday_text.map((day) => (
              <li key={day}>{day}</li>
            ))}
          </ul>
          {place.website ? <Button variant="outlined" startIcon={<PublicIcon />}>WEBSITE</Button> : <Button variant="outlined" disabled startIcon={<PublicIcon />}>WEBSITE</Button>}
          <Button variant="outlined" startIcon={<DeleteIcon />}onClick={() => handleDelete(itineraryId, place._id, index)}>
            Delete
          </Button>
          {place.opening_hours ? <Button variant="outlined" startIcon={<QueryBuilderIcon />}>Hours</Button> : <Button variant="outlined" disabled startIcon={<QueryBuilderIcon />}>Hours</Button>}
        </Grid>
        <Grid p={2} item xs={4}>
          <Image
            imageStyle={{ borderRadius: "4px" }}
            src="asd"
            alt={place.name}
          />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default ItineraryCard;
