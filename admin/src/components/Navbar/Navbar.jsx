// import React from 'react
import './Navbar.css';
import { assets } from '../../assets/assets';


const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo_1} alt='logo' />
        <img className='profile' src={assets.Dianne} alt='profile imagef' />
    </div>
  )
}

export default Navbar
