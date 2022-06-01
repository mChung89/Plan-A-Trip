import "../styles/App.css";
import MainPage from "./MainPage";
import Stack from "@mui/material/Stack";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import AuthPage from './AuthPage'
import { useState, useEffect } from "react";
import { useLoadScript } from '@react-google-maps/api'


const libraries = ["places"]

function App() {
  const [currentTrip, setTrip] = useState(null)
  const [user, setUser] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [currentTripName, setCurrentTripName] = useState('')
  const [tripSelector, setTripSelector] = useState([])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    libraries
  });

  useEffect(()=>{
    fetch(`refresh`)
    .then(res => res.ok ? res.json()
    .then(data => {
      console.log(data)
      setUser(data)
      setTrip(data.user.itineraries[0].tripId)
      setTripSelector(data.user.itineraries)
      setCurrentTripName(data.user.itineraries[0].tripName)
    }) : null)
    return () => "Clean up"
  },[])

  
  return (
    <Stack className='App'>
        <NavBar user={user} setUser={setUser} setTripSelector={setTripSelector} setItinerary={setItinerary} setTrip={setTrip}/>
        <Routes>
          <Route path="/" element={<Home setCurrentTripName={setCurrentTripName} setUser={setUser} setItinerary={setItinerary} user={user} currentTrip={currentTrip} setTrip={setTrip}/>} />
          <Route path="/makeitinerary" element={<MainPage setTripSelector={setTripSelector} tripSelector={tripSelector} currentTripName={currentTripName} setCurrentTripName={setCurrentTripName} setUser={setUser} isLoaded={isLoaded} itinerary={itinerary} setItinerary={setItinerary} setTrip={setTrip} currentTrip={currentTrip} user={user}/>} />
          <Route
            path="/login"
            element={<div id="login-page"><AuthPage setTripSelector={setTripSelector} setCurrentTripName={setCurrentTripName} user={user} setTrip={setTrip} setUser={setUser} /></div>}
          />
        </Routes>
    </Stack>
  );
}
export default App;
