import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { getGeocode } from "use-places-autocomplete";
import NewTripDialog from "./NewTripDialog";
import Hero from "./images/NatJBrU.jpg";
import "../styles/App.css";
import IconButton from "@mui/material/IconButton";
import { gsap } from "gsap";
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

function Home({ user, setUser, setTrip, setItinerary, setCurrentTripName }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [searchTripInfo, setSearchTripInfo] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };

  //Search for a general place to point GoogleMaps Location + Radius
  async function searchByPlace() {
    const results = await getGeocode({ address: search });
    setSearchTripInfo(results[0]);
    setOpen(true);
  }
  
  useEffect(()=> {
    const hero = document.querySelector(".hero");
    const t1 = gsap.timeline();
    t1.fromTo(
      hero,
      1.5,
      { height: "0%" },
      { height: "80%", ease: "Power2.easeInOut" }
    )
      .fromTo(
        hero,
        1.2,
        { width: "100%" },
        { width: "90%", ease: "Power2.easeInOut" }
      )
  },[])

  return (
    <>
    <Stack>
      <div className="slider"></div>
      <section>
        <div className="hero">
          <img id="hero-img" src={Hero} alt="Hero"></img>
          <div id="search-new-itinerary">
            <Typography
              variant="h1"
              textAlign="center"
              sx={{ color: "white", textShadow: "2px 2px #000000" }}
            >
              {user ? `Welcome back ${user?.user?.name}` : "Hello World"}
            </Typography>
            <TextField
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              sx={{ bgcolor: "white", borderRadius: 1, width: 600 }}
              placeholder="Create a new Trip!"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={searchByPlace}>Search</IconButton>
                ),
              }}
            />
          </div>
        </div>
      </section>
      <div className="slider"></div>
      <NewTripDialog
        setTrip={setTrip}
        setItinerary={setItinerary}
        setUser={setUser}
        user={user}
        searchTripInfo={searchTripInfo}
        setCurrentTripName={setCurrentTripName}
        open={open}
        handleClose={handleClose}
      />
    </Stack>
    <Stack sx={{bgcolor: 'lightblue'}}>
      <Grid container>
          <Grid item xs={3}>
            <h1>Hello World</h1>
          </Grid>
          <Grid item xs={3}>
            <h1>Hello World</h1>
          </Grid>
          <Grid item xs={3}>
            <h1>Hello World</h1>
          </Grid>
          <Grid item xs={3}>
            <h1>Hello World</h1>
          </Grid>
      </Grid>
    </Stack>
    <Stack sx={{height: 80, bgcolor:'lightgray'}} mt={37.5}direction='column-reverse'>
      <h1>Footer</h1>
    </Stack>
    </>
  );
}

export default Home;
