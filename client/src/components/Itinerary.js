import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import PlacesAutoComplete from "./PlacesAutoComplete";
import "../styles/map.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import DatePicker from "./DatePicker";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

//CALENDAR

function Itinerary({ addToItinerary, setZoom, itinerary, isLoaded, tripId }) {
  const [selectedDate, setSelDate] = useState("");
  const [open, setOpen] = useState(false);

  const menuItems = itinerary?.map((date) => {
    const formattedDate = new Date(date.date);
    return (
      <MenuItem key={date._id} value={date._id}>
        {formattedDate.toString().slice(4, 15)}
      </MenuItem>
    );
  });

  function handleChange(e) {
    setSelDate(e.target.value);
  }

  function handleClick() {
    setOpen((prev) => !prev);
  }

  return (
    <Grid item justifyContent="space-between" alignItems="stretch" pb={3}>
      <Paper>
        <Stack justifyContent="center" alignItems="center" p={2} spacing={2}>
          <Typography variant="h1">Find new place here</Typography>
          <Grid container direction="row" sx={{ transition: "height 0.8s" }}>
            {isLoaded ? (
              <Grid item xs={6}>
                <PlacesAutoComplete
                  selectedDate={selectedDate}
                  addToItinerary={addToItinerary}
                  setZoom={setZoom}
                />
              </Grid>
            ) : null}
            <Grid item xs={6}>
              <FormControl sx={{width: "50%"}}>
                <InputLabel>Select a date to add place to</InputLabel>
                <Select
                  onChange={handleChange}
                  value={selectedDate}
                  label="Select a date to add place to"
                  placeholder="Select a date"
                >
                  {menuItems}
                </Select>
              </FormControl>
              <Button variant="outlined" size="large" onClick={handleClick}>Change dates</Button>
            </Grid>
            {open ? (
              <DatePicker
                itinerary={itinerary}
                tripId={tripId}
                open={open}
                setOpen={setOpen}
              />
            ) : null}
          </Grid>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default Itinerary;
