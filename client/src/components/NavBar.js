import { NavLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

function NavBar({ setUser, setItinerary, setTrip }) {
    function handleLogOut() {
        fetch('/logout')
        setUser(null)
        setItinerary([])
        setTrip(null)
    }


  return (
    <AppBar position="static" sx={{background: 'transparent', zIndex: 10}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BeachAccessIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TripMaker
          </Typography>
          <BeachAccessIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} component={NavLink} to='/makeitinerary'>Itinerary</Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} component={NavLink} to='/login'>Login</Button>
          </Box>
          <Box>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleLogOut}>Logout</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar