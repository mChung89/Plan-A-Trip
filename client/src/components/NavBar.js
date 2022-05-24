import { NavLink } from 'react-router-dom'
function NavBar() {

    return (
        <div className='nav'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/makeitinerary'>Itinerary</NavLink>
            <NavLink to='/login'>Login</NavLink>
        </div>
    )
}

export default NavBar