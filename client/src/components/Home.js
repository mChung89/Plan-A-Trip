import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import NewTripDialog from "./NewTripDialog";
import Hero from "./images/NatJBrU.jpg";
import "../styles/App.css";
import IconButton from "@mui/material/IconButton";
import { gsap } from "gsap";

function Home({ user, setUser, setTrip, setItinerary }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [searchTripInfo, setSearchTripInfo] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    fetch(`refresh`)
    .then(res => res.ok ? res.json()
    .then(data => {
      setUser(data)
      setTrip(data.user.itineraries[0].tripId)
    }) : null)
  },[])
  
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
        open={open}
        handleClose={handleClose}
      />
    </>
  );
}

export default Home;
