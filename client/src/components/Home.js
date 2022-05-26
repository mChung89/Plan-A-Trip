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
import { getGeocode,getLatLng } from "use-places-autocomplete";
import NewTripDialog from './NewTripDialog'



function Home({ user, setTrip, currentTrip, setCenter, setItinerary }) {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [searchTripInfo, setSearchTripInfo] = useState(null)

  
    const handleClose = () => {
      setOpen(false);
    };

    const mappedTrips = user?.user?.itineraries.map(trip => <MenuItem key={trip.tripId} value={trip.tripId}>{trip.tripName}</MenuItem>)

    // Sets the trip to be shown on itinerary page and navigates to itinerary page
    function handleTripChange (e) {
        console.log(e.target.value)
        setTrip(e.target.value)
        navigate('/makeitinerary')
    }

    //Search for a general place to point GoogleMaps Location + Radius
    async function searchByPlace () {
        console.log(search)
        const results = await getGeocode({address: search})
        console.log(results)
        const { lat, lng } = await getLatLng(results[0]);
        // setSearchTripInfo(results[0])

        setOpen(true)
        // setCenter({lat, lng})
        // setItinerary([])
    }
    return (
        <Grid container sx={{ bgcolor: 'black', height: '100vh' }} alignItems="center" justifyContent='center'>
            <Grid item xs={4} sx={{bgcolor:'red'}}>
            <Typography variant='h1' sx={{ color: 'white' }} textAlign="center">{user ? `Welcome back ${user?.user?.name}` : "Hello World"}</Typography>
            <TextField onChange={(e) => setSearch(e.target.value)} value={search} sx={{bgcolor: 'white', width: 600}} placeholder='Make a new Trip!'/>
            <Button onClick={searchByPlace} sx={{bgcolor:'white'}}>Search!</Button>
            </Grid>
            <Grid container sx={{bgcolor: 'aquamarine'}}>
                <Grid alignItems="center" item xs={12}>
                    {user ? <FormControl sx={{width: "500px"}}><InputLabel>Choose a saved trip</InputLabel><Select value={currentTrip} onChange={handleTripChange}>{mappedTrips}</Select></FormControl> : null}
                </Grid>
            </Grid>
            {/* <NewTripDialog searchTripInfo={searchTripInfo} open={open} handleClose={handleClose}/> */}
        </Grid>
    )
}

export default Home