import React, { useContext } from 'react'
import './navBar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {

  const { user } = useContext(AuthContext)
  return (
    <div className='Navbar'>
      <div className="NavbarContainer">
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
          <h2 className="logo">Booking-Clone</h2>
        </Link>
        {user ? user.username : <div>
          <button className="nbtns">Register</button>
          <Link to={"/login"}>

            <button className="nbtns">Login</button>
          </Link>
        </div>}
      </div>

    </div>
  )
}

export default Navbar