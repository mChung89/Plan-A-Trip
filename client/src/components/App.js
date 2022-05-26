import "../styles/App.css";
import MainPage from "./MainPage";
import Stack from "@mui/material/Stack";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import AuthPage from './AuthPage'
import { createContext, useState } from "react";

const userName = {
  accessToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiV2VkIE1heSAyNSAyMDIyIDE1OjE5OjA1IEdNVC0wNDAwIChFYXN0ZXJuIERheWxpZ2h0IFRpbWUpIiwiX2lkIjoiNjI4NjhjOTYyNDdkZTNhODVmN2UxNDk1IiwidXNlcm5hbWUiOiJXaWxsaWFtIiwiaWF0IjoxNjUzNTA2MzQ1LCJleHAiOjE2NTM1MDgxNDV9.qRHwgBVqzInYQSCRKAJgK66IS-6Q8D-M2Cf5X_duQ0E",
  user: {
    date: "2022-05-19T18:29:42.576Z",
    email: "cryptoboy@gmail.com",
    itineraries: [{ tripName: "Rome", tripId: "6287eac92bfe37305ebfb47d" }],
    name: "William",
    password: "$2a$10$x/x7sHJ1.HxxgNewLVgi.u1JgH4CDjO3KQzl0Fld3WAmWzBdr/VU2",
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiV2VkIE1heSAyNSAyMDIyIDE1OjEzOjA0IEdNVC0wNDAwIChFYXN0ZXJuIERheWxpZ2h0IFRpbWUpIiwiX2lkIjoiNjI4NjhjOTYyNDdkZTNhODVmN2UxNDk1IiwiaWF0IjoxNjUzNTA1OTg0LCJleHAiOjE2NTM1OTIzODR9.1Gv2sXLWU7hxgxKALLDBnw_tts7yfJD2V4WanXt2RtQ",
    __v: 0,
    _id: "62868c96247de3a85f7e1495",
  },
};

function App() {
  const [currentTrip, setTrip] = useState("6287eac92bfe37305ebfb47d")
  const [user, setUser] = useState(userName);
  const [center,setCenter] = useState({lat: 40.705543976313464, lng: -74.01357140807622})
  const [itinerary, setItinerary] = useState([]);


  return (
    <Stack>
      {/* <UserContext.Provider value={user}> */}
        <NavBar setUser={setUser}/>
        <Routes>
          <Route path="/" element={<Home setItinerary={setItinerary} setCenter={setCenter} user={user} currentTrip={currentTrip} setTrip={setTrip}/>} />
          <Route path="/makeitinerary" element={<MainPage itinerary={itinerary} setItinerary={setItinerary} center={center} setTrip={setTrip} currentTrip={currentTrip} user={user}/>} />
          <Route
            path="/login"
            element={<AuthPage user={user} setUser={setUser} />}
          />
        </Routes>
      {/* </UserContext.Provider> */}
    </Stack>
  );
}
export default App;
