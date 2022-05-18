import "../styles/App.css";
import Home from "./Home";
import Stack from "@mui/material/Stack";

function App() {
  return (
    <Stack>
      <Stack className='nav'>
        <nav>Nav Bar</nav>
      </Stack>
      <Stack className='main'>
        <Home />
      </Stack>
    </Stack>
  );
}
export default App;
