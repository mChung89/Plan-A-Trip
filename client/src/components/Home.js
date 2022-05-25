import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import FormControl from '@mui/material/FormControl'
import InputLabel from "@mui/material/InputLabel";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'



function Home({ user, setTrip }) {
    const [search, setSearch] = useState(null)
    const navigate = useNavigate()
    const mappedTrips = user?.user?.itineraries.map(trip => <MenuItem key={trip.tripId} value={trip.tripId}>{trip.tripName}</MenuItem>)

    // Sets the trip to be shown on itinerary page and navigates to itinerary page
    function handleTripChange (e) {
        console.log(e.target.value)
        setTrip(e.target.value)
        navigate('/makeitinerary')
    }

    //Search for a general place to point GoogleMaps Location + Radius
    function searchByPlace () {
     
    }
    return (
        <Grid container sx={{ bgcolor: 'black', height: '100vh' }} justifyContent='center'>
            <Grid item xs={12}>
            <Typography variant='h1' sx={{ color: 'white' }} textAlign="center">{user ? `Welcome back ${user?.user?.name}` : "Hello World"}</Typography>
            <TextField onChange={(e) => setSearch(e.target.value)} value={search}sx={{bgcolor: 'white'}} placeholder='Make a new Trip!'></TextField>
            <Button onClick={searchByPlace} sx={{bgcolor:'white'}}>Search!</Button>
            </Grid>
            <Grid container sx={{bgcolor: 'white'}}>
                <Grid alignItems="center" item xs={12}>
                    {user ? <FormControl sx={{width: "500px"}}><InputLabel>Choose a saved trip</InputLabel><Select onChange={handleTripChange}>{mappedTrips}</Select></FormControl> : null}
                </Grid>

            </Grid>

        </Grid>
    )
}

export default Home