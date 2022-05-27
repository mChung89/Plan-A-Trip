import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
function NavBar({setUser, setItinerary}) {

    function handleLogOut() {
        fetch('/logout')
        setUser(null)
        setItinerary([])
    }

    return (
        <AppBar>
            <Toolbar>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/makeitinerary'>Itinerary</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <Button onClick={handleLogOut}>Log Out</Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar