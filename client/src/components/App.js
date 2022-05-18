import "../styles/App.css";
import Home from "./Home";
import Login from "./Login"
import Stack from "@mui/material/Stack";
import { Routes, Route } from 'react-router-dom'
import NavBar from './NavBar'


function App() {
  return (
    <Stack>
      <NavBar />
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />} />
      </Routes>
    </Stack>
  );
}
export default App;
