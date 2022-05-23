import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PlacesAutoComplete from "./PlacesAutoComplete";
import "../styles/map.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import TextField from "@mui/material/TextField";
//CALENDAR
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function Itinerary({
  addToItinerary,
  setZoom,
  itinerary,
  itineraryId,
  isLoaded,
}) {
  const [selectedDate, setSelDate] = useState("");
  const [value, setValue] = ([null, null])
  const menuItems = itinerary.map((date, index) => {
    const formattedDate = new Date(date.date);
    return (
      <MenuItem key={index} value={index}>
        {formattedDate.toString().slice(4, 15)}
      </MenuItem>
    );
  });

  function handleChange(e) {
    setSelDate(e.target.value);
  }

  return (
    <Grid item justifyContent="space-between" alignItems="stretch" pb={3}>
      <Paper>
        <Box p={2}>
          <Typography variant="h1">Find new place here</Typography>
          <Grid container direction="row">
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
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              
            </LocalizationProvider>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Itinerary;
