import { NavLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import '../styles/nav.css'

function NavBar({ setUser, setItinerary, setTrip, user, setTripSelector }) {
    function handleLogOut() {
        fetch('/logout')
        setUser(null)
        setItinerary([])
        setTrip(null)
        setTripSelector([])
    }

  return (
    <AppBar position="static" sx={{background: 'transparent', height: "5vh", zIndex: 10}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ConnectingAirportsIcon id="logo" sx={{ fontSize: 45, display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 40,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Itinerary App
          </Typography>
          <ConnectingAirportsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 40,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Itinerary App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} component={NavLink} to='/makeitinerary'>My Itinerary</Button>
            {user ? null: <Button sx={{ my: 2, color: 'white', display: 'block' }} component={NavLink} to='/login'>Login</Button>}
          </Box>
          <Box>
            {user ? <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleLogOut}>Logout</Button> : null}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar