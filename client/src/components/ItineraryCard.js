import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Image from "material-ui-image";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PublicIcon from '@mui/icons-material/Public';
import DeleteIcon from '@mui/icons-material/Delete';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { Draggable } from 'react-beautiful-dnd'

function ItineraryCard({ place, itineraryId, deleteFromItinerary, index }) {
  function handleDelete(itineraryId, placeId, index) {
    fetch(`/itinerary/${itineraryId}/${placeId}`, { method: "DELETE" }).then(
      (res) => deleteFromItinerary(placeId, itineraryId)
    );
  }

  return (
      <Draggable key={place._id} draggableId={place._id} index={index}>
        {(provided, snapshot) => {
          return (
            <Grid
              container
              direction="row"
              p={2}
              key={itineraryId + place.id + index}
              className="place-cards"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                // userSelect: 'none',
                ...provided.draggableProps.style
              }}
            >
              <Paper elevation={4} sx={{display: "flex", width: "100%" }}>
                <Grid p={2} item xs={8}>
                  <Typography variant="h4">{place.name}</Typography>
                  <Typography variant="h6">{place.formatted_address}</Typography>
                  <ul>
                    {place.opening_hours?.weekday_text.map((day) => (
                      <li key={day}>{day}</li>
                    ))}
                  </ul>
                  {place.website ? <Button href={place.website} variant="outlined" startIcon={<PublicIcon />}>WEBSITE</Button> : <Button variant="outlined" disabled startIcon={<PublicIcon />}>WEBSITE</Button>}
                  <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(itineraryId, place._id, index)}>
                    Delete
                  </Button>
                  {place.opening_hours ? <Button variant="outlined" startIcon={<QueryBuilderIcon />}>Hours</Button> : <Button variant="outlined" disabled startIcon={<QueryBuilderIcon />}>Hours</Button>}
                </Grid>
                <Grid p={2} item xs={4}>
                  <Image
                    imageStyle={{ borderRadius: "4px", objectFit: "cover" }}
                    src={place.photos[0]}
                    alt={place.name}
                  />
                </Grid>
              </Paper>
            </Grid>
          )
        }}
      </Draggable>
  );
}

export default ItineraryCard;
