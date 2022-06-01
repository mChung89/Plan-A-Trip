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
import Typography from '@mui/material/Typography'

//CALENDAR

function Itinerary({
  setUser,
  setCurrentTripName,
  handleSave,
  setItinerary,
  itinerary,
  user,
  tripId,
  setTrip,
  currentTripName
}) {
  const [open, setOpen] = useState(false);
  const mappedTrips = user?.user?.itineraries.map((trip, index) => {
    return (
      <MenuItem key={trip.tripId} value={trip.tripId}>
        {trip.tripName ? trip.tripName : `Unnamed Trip ${index + 1}`}
      </MenuItem>
    );
  });
  function dateRange(itinerary) {
    const startDate = new Date(itinerary?.[0]?.date)
    const endDate = new Date(itinerary?.[itinerary?.length - 1]?.date)
    return `${startDate.getMonth() + 1}/${startDate.getDate()} - ${endDate.getMonth() + 1}/${endDate.getDate()}`
  }

  let tripDates = null

  if (itinerary.length > 0) {
    tripDates = (
      <>
        <Typography>Your current trip:</Typography>
        <Typography>{dateRange(itinerary)}</Typography>
      </>
    )
  }

  function handleClick() {
    if (itinerary) setOpen((prev) => !prev);
  }

  const handleChangeTrip = (e) => {
    setTrip(e.target.value)
  }

  const handleNameChange = () => {
    fetch(`/trip/editname/${tripId}/${user.user._id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({currentTripName})
    })
    .then(res => res.ok ? res.json().then(data => {
      setCurrentTripName(data.updatedName)
    }) :null)
  }

  return (
    <Grid item justifyContent="space-between" alignItems="stretch" pb={3}>
      <Paper>
        <Stack justifyContent="center" alignItems="center" p={2} spacing={2}>
          {itinerary.length > 0 ?
             <TextField
             fullWidth
             InputProps={{ style: { fontSize: 40 } }}
             InputLabelProps={{ style: { fontSize: 40 } }}
             placeholder="Edit trip name"
             variant="standard"
             size="large"
             sx={{ outline: "none" }}
             value={currentTripName}
             onChange={(e) => setCurrentTripName(e.target.value)}
             onBlur={handleNameChange}
           /> : <Typography variant="h3">Get started at the Home Page</Typography>}
          <Grid
            container
            spacing={1}
            direction="row"
            sx={{ transition: "height 0.8s" }}
          >
            <Grid item xs={3}>
              {tripDates}
            </Grid>
            <Grid item xs={3}>
              {user ? (
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Choose another trip to edit</InputLabel>
                  <Select onChange={handleChangeTrip} value={tripId}>
                    {mappedTrips}
                  </Select>
                </FormControl>
              ) : null}
            </Grid>
            <Grid item xs={3}>
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
            <Grid item xs={3} align-content="space-around">
              {itinerary.length > 0 ?
                <Button
                  variant='outlined'
                  fullWidth
                  onClick={handleClick}
                >
                  Change dates
                </Button> : null}
              {!user && itinerary.length > 0 ? <Button
                sx={{ topBorderRadius: 1, border: "1px blue solid" }}
                fullWidth
                onClick={handleSave}
              >
                Login to save
              </Button> : null}
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default Itinerary;
