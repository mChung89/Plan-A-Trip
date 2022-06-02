import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { getGeocode } from "use-places-autocomplete";
import NewTripDialog from "./NewTripDialog";
import Hero from "./images/NatJBrU.jpg";
import "../styles/App.css";
import Link from "@mui/material/Link";
import { gsap } from "gsap";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box'


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

  useEffect(() => {
    const hero = document.querySelector(".hero");
    const t1 = gsap.timeline();
    t1.fromTo(
      hero,
      1.5,
      { height: "0%" },
      { height: "80%", ease: "Power2.easeInOut" }
    ).fromTo(
      hero,
      1.2,
      { width: "100%" },
      { width: "90%", ease: "Power2.easeInOut" }
    );
  }, []);

  return (
    <>
      <Stack sx={{overflowX: "hidden"}}>
        <section>
          <div className="hero">
            <img id="hero-img" src={Hero} alt="Hero"></img>
            <div id="search-new-itinerary">
              <Typography
                variant="h1"
                textAlign="center"
                sx={{
                  color: "white",
                  textShadow: "2px 2px #000000",
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: 80,
                }}
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
                    <SearchIcon onClick={searchByPlace}/>
                  ),
                }}
              />
            </div>
          </div>
        </section>
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
      <Stack sx={{height: '40vh'}}/>
      <Stack sx={{ background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(218,42,42,1) 50%, rgba(252,176,69,1) 100%)',height: '45vh', bgcolor: 'gray'}}>
        <Grid container direction='row' pt={4} justifyContent='center' spacing={4}>
          <Grid item xs={2}>
            <Paper elevation={4} px={3} sx={{height: "40vh", overflowY: 'scroll'}}>
              <Typography p={5} textAlign='center' variant='h6'>This Itinerary App allows you to plan out your trips. First, pick a general location for where you will be traveling and specify how many days you're planning for. A skeleton itinerary will be generated where you can populate it with places you want to stop by. You can easily rearrange the order of places by dragging and dropping them! You can also drag and drop them across dates! If you need to adjust your itinerary dates, simply use the button to change the dates you will need. I hope you enjoy using this app to plan your future getaways!</Typography>
            </Paper>
          </Grid>
          <Grid item xs={2} justifyContent='center' alignItems='center'>
            <Paper elevation={4} sx={{height: "40vh"}}>
              <Box display='flex' sx={{flexDirection: 'column', height: '80%'}} justifyContent='center'>
                <Stack>
                  <Typography sx={{color: "#4c8bf5"}} variant='h5'>
                    Find me at:
                  </Typography>
                </Stack>
              <Stack direction='row' justifyContent='center' alignItems='center'>
                <GitHubIcon />
                <Link variant='h6' href='https://github.com/mchung89'> mChung89</Link>
                </Stack>
              <Stack direction='row' justifyContent='center' alignItems='center'>
                <LinkedInIcon />
                <Link variant='h6' href='www.linkedin.com/in/michael-chung-3371b05a'> /michael-chung-3371b05a</Link>
              </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
      <Stack className='footer' sx={{height: 100}}>
      <Grid container>
        <Grid item xs={3}>
          <Typography sx={{color: 'white'}}>
            Footer Section coming soon
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{color: 'white'}}>
            Footer Section coming soon
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{color: 'white'}}>
            Footer Section coming soon
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{color: 'white'}}>
            Footer Section coming soon
          </Typography>
        </Grid>
      </Grid>
      </Stack>
    </>
  );
}

export default Home;
