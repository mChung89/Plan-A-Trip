import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Image from "material-ui-image";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PublicIcon from '@mui/icons-material/Public';
import DeleteIcon from '@mui/icons-material/Delete';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'

function ItineraryCard({ place, itineraryId, deleteFromItinerary, index }) {
  const [showHours,setShow] = useState(false)
  function handleDelete(itineraryId, placeId, index) {
    fetch(`/itinerary/${itineraryId}/${placeId}`, { method: "DELETE" }).then(
      (res) => deleteFromItinerary(placeId, itineraryId)
    );
  }
  const [imageNumber, setImageNumber] = useState(0 % 10)

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
                <Grid p={2} item xs={8} >
                  <Typography variant="h4">{place.name}</Typography>
                  <Typography variant="h6">{place.formatted_address}</Typography>
                    {place.website ? <Button href={place.website} variant="outlined" startIcon={<PublicIcon />}>WEBSITE</Button> : <Button variant="outlined" disabled startIcon={<PublicIcon />}>WEBSITE</Button>}
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(itineraryId, place._id, index)}>
                      Delete
                    </Button>
                    {place.opening_hours ? <Button onClick={() => setShow(prev => !prev)}variant="outlined" startIcon={<QueryBuilderIcon />}>Hours</Button> : <Button variant="outlined" disabled startIcon={<QueryBuilderIcon />}>Hours</Button>}
                  <Grid sx={{height: 190}}>
                  {showHours ? <ul style={{bgcolor: 'lightblue', maxHeight: "5vh"}}>{place.opening_hours?.weekday_text.map((day) => (
                      <li key={day}>{day}</li>
                    ))}
                  </ul> : null}
                  </Grid>
                </Grid>
                <Grid p={2} item xs={4}>
                  <Image
                    onClick={()=> setImageNumber(prev => (prev + 1) % 10)}
                    imageStyle={{ borderRadius: "4px", objectFit: "cover" }}
                    src={place.photos[imageNumber]}
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
