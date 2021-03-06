import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import PlacesAutoComplete from './PlacesAutoComplete'
import Typography from '@mui/material/Typography'
import { useState } from 'react' 

function SearchCard({ isLoaded, addToItinerary, addIfNotInDb, date }) {
    const [focus, setFocus] = useState(false)
    async function addToList(place_id, results, lat, lng) {
        fetch(`/places/${place_id}`).then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              addToItinerary(data, date._id);
            });
          } else {
            const parameters = {
              placeId: place_id,
              fields: ["name", "website", "opening_hours", "photo"],
            };
            addIfNotInDb(parameters, results, lat, lng, date._id);
          }
        });
      }
    const containerStyle = {
        height: 120,
        opacity: focus ? "1" : "0.8"
    }

    const searchBox = isLoaded ? (
        <Grid
            container
            direction="column"
            sx={containerStyle}
            p={1}
            className="place-cards"
        >
            <Paper elevation={4} sx={{ width: "100%" }}>
                <Grid item xs={12}>
                    <Typography variant='h5'>
                        Add a place to this date
                    </Typography>
                </Grid>
                <Grid item xs={12} justifyContent='center' alignItems='center' sx={{ borderRadius: 1}}>
                    <PlacesAutoComplete
                        setFocus={setFocus}
                        addToList={addToList}
                        addToItinerary={addToItinerary}
                    />
                </Grid>
            </Paper>
        </Grid>
    ) : null


    return (
        <>
            {searchBox}
        </>
    )
}

export default SearchCard