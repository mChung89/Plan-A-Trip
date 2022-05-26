import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
function NavBar({setUser}) {

    function handleLogOut() {
        fetch('/logout')
        setUser(null)
    }

    return (
        <div className='nav'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/makeitinerary'>Itinerary</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <Button onClick={handleLogOut}>Log Out</Button>
        </div>
    )
}

export default NavBar