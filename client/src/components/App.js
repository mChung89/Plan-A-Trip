import "../styles/App.css";
import MainPage from "./MainPage";
import Login from "./Login"
import Stack from "@mui/material/Stack";
import { Routes, Route } from 'react-router-dom'
import NavBar from './NavBar'
import Home from './Home'


function App() {
  return (
    <Stack>
      <NavBar />
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/makeitinerary' element={<MainPage />}/>
          <Route path='/login' element={<Login />} />
      </Routes>
    </Stack>
  );
}
export default App;
