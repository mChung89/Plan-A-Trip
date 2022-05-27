import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import FormControl from '@mui/material/FormControl'
import InputLabel from "@mui/material/InputLabel";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { getGeocode,getLatLng } from "use-places-autocomplete";
import NewTripDialog from './NewTripDialog'



function Home({ user, setUser, setTrip, currentTrip, setItinerary }) {
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [searchTripInfo, setSearchTripInfo] = useState(null)

    const handleClose = () => {
      setOpen(false);
    };

    //Search for a general place to point GoogleMaps Location + Radius
    async function searchByPlace () {
        const results = await getGeocode({address: search})
        setSearchTripInfo(results[0])
        setOpen(true)
    }
    return (
        <Grid container sx={{ bgcolor: 'black', height: '100vh' }} alignItems="center" justifyContent='center'>
            <Grid item xs={4} sx={{bgcolor:'red'}}>
            <Typography variant='h1' sx={{ color: 'white' }} textAlign="center">{user ? `Welcome back ${user?.user?.name}` : "Hello World"}</Typography>
            <TextField onChange={(e) => setSearch(e.target.value)} value={search} sx={{bgcolor: 'white', width: 600}} placeholder='Make a new Trip!'/>
            <Button onClick={searchByPlace} sx={{bgcolor:'white'}}>Search!</Button>
            </Grid>
            <NewTripDialog setTrip={setTrip} setItinerary={setItinerary} setUser={setUser} user={user} searchTripInfo={searchTripInfo} open={open} handleClose={handleClose}/>
        </Grid>
    )
}

export default Home