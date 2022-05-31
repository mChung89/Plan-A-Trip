import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import "../styles/map.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import DatePicker from "./DatePicker";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

//CALENDAR

function Itinerary({
  addToItinerary,
  setItinerary,
  itinerary,
  isLoaded,
  user,
  tripId,
  setTrip
}) {
  const [open, setOpen] = useState(false);
  const [tripName, setTripName] = useState("My trip name");
  const mappedTrips = user?.user?.itineraries.map((trip) => {
    return (
      <MenuItem key={trip.tripId} value={trip.tripId}>
        {trip.tripName}
      </MenuItem>
    );
  });

  const menuItems = itinerary.map((date) => {
    const formattedDate = new Date(date.date);
    return (
      <MenuItem key={date.date + date._id} value={date._id}>
        {formattedDate.toString().slice(4, 15)}
      </MenuItem>
    );
  });
  console.log('rerender')

  function handleClick() {
    setOpen((prev) => !prev);
  }

  const handleChangeTrip = (e) => {
    setTrip(e.target.value)
  }

  return (
    <Grid item justifyContent="space-between" alignItems="stretch" pb={3}>
      <Paper>
        <Stack justifyContent="center" alignItems="center" p={2} spacing={2}>
          <TextField
            fullWidth
            InputProps={{ style: { fontSize: 40 } }}
            InputLabelProps={{ style: { fontSize: 40 } }}
            placeholder="Edit trip name"
            variant="standard"
            size="large"
            sx={{ outline: "none"}}
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
          />
          <Grid container spacing={3} direction="row" sx={{ transition: "height 0.8s" }}>
            {/* {isLoaded ? (
              <Grid item xs={6} sx={{bgcolor: 'red'}}>
                <PlacesAutoComplete
                  addToList={addToList}
                  addToItinerary={addToItinerary}
                />
              </Grid>
            ) : null} */}
            <Grid item xs={6}>
              <FormControl sx={{width: '40%'}}>
                <InputLabel>Choose another trip to edit</InputLabel>
                <Select onChange={handleChangeTrip} value={tripId}>{mappedTrips}</Select>
              </FormControl>
              <Button variant="outlined" size="large" onClick={handleClick}>
                Change dates
              </Button>
            </Grid>
            {open ? (
              <DatePicker
                itinerary={itinerary}
                tripId={tripId}
                open={open}
                setOpen={setOpen}
                setItinerary={setItinerary}
              />
            ) : null}
          </Grid>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default Itinerary;
