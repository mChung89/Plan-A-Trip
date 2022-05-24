import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PlacesAutoComplete from "./PlacesAutoComplete";
import "../styles/map.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import DatePicker from './DatePicker'
import Button from '@mui/material/Button'
//CALENDAR

function Itinerary({
  addToItinerary,
  setZoom,
  itinerary,
  isLoaded,
  tripId
}) {
  const [selectedDate, setSelDate] = useState("");
  const [open, setOpen] = useState(false)

  const menuItems = itinerary?.map(date => {
    const formattedDate = new Date(date.date);
    return (
      <MenuItem key={date._id}  value={date._id}>
        {formattedDate.toString().slice(4, 15)}
      </MenuItem>
    );
  });

  function handleChange(e) {
    setSelDate(e.target.value)
  }

  function handleClick () {
    setOpen(prev => !prev)
  }

  return (
    <Grid item justifyContent="space-between" alignItems="stretch" pb={3}>
      <Paper>
        <Box p={2}>
          <Typography variant="h1">Find new place here</Typography>
          <Grid container direction="row" sx={{transition: "height 0.8s"}}>
            {isLoaded ? (
              <Grid item xs={7}>
                <PlacesAutoComplete
                  selectedDate={selectedDate}
                  addToItinerary={addToItinerary}
                  setZoom={setZoom}
                />
              </Grid>
            ) : null}
            <Grid item xs={5}>
              <Select
                ml={7}
                onChange={handleChange}
                value={selectedDate}
                label="Date"
                placeholder="Select a date"
              >
                {menuItems}
              </Select>
              <Button onClick={handleClick}>Change dates</Button>
            </Grid>
              {open ? <DatePicker itinerary={itinerary} tripId={tripId} open={open} setOpen={setOpen} /> : null}
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Itinerary;
