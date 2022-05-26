import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import PlacesAutoComplete from "./PlacesAutoComplete";
import "../styles/map.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import DatePicker from "./DatePicker";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { getDetails } from "use-places-autocomplete";
import TextField from '@mui/material/TextField'


//CALENDAR

function Itinerary({ handleSave, addToItinerary, setItinerary, itinerary, isLoaded, user, tripId }) {
  const [selectedDate, setSelDate] = useState("");
  const [open, setOpen] = useState(false);
  const [tripName, setTripName] = useState("My trip name")
  
  const menuItems = itinerary.map(date => {
    const formattedDate = new Date(date.date);
    return (
      <MenuItem key={date.date + date._id} value={date._id}>
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

  async function addIfNotInDb(parameters, results, lat, lng, selectedDate) {
    const details = await getDetails(parameters);
    const photos = details?.photos?.map((photo) => photo.getUrl());
    const placeObj = {
      name: details.name,
      photos: photos,
      place_id: results.place_id,
      opening_hours: details.opening_hours,
      website: details.website,
      formatted_address: results.formatted_address,
      lat: lat,
      lng: lng,
    };
    fetch("/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(placeObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Adding this to data", data);
        addToItinerary(data, selectedDate);
      });
  }

  async function addToList(place_id, results, lat, lng) {
    fetch(`/places/${place_id}`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log("Add to list:", itinerary)
          addToItinerary(data, selectedDate);
        });
      } else {
        const parameters = {
          placeId: place_id,
          fields: ["name", "website", "opening_hours", "photo"],
        };
        addIfNotInDb(parameters, results, lat, lng, selectedDate);
      }
    });
  }

  return (
    <Grid item justifyContent="space-between" alignItems="stretch" pb={3}>
      <Paper>
        <Stack justifyContent="center" alignItems="center" p={2} spacing={2}>
          <TextField fullWidth variant="standard" size='large' sx={{outline: 'none'}}value={tripName} onChange={(e) => setTripName(e.target.value)}/>
          <Grid container direction="row" sx={{ transition: "height 0.8s" }}>
            {isLoaded ? (
              <Grid item xs={6}>
                <PlacesAutoComplete
                  addToList={addToList}
                  addToItinerary={addToItinerary}
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
              {user ? <Button variant="outlined" size="large" onClick={handleSave}>Save itinerary</Button> : null}
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
