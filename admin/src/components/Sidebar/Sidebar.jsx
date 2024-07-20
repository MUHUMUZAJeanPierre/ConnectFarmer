import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'> 
        <NavLink to="/add" className='sidebar-option'>
          <img src={assets.add_icon} alt="add icon" />
          <p>Add Product</p>
        </NavLink>
        <NavLink to="/list" className='sidebar-option'>
          <img src={assets.order_icon} alt="order icon" />
          <p>List Products</p>
        </NavLink>
        <NavLink to="/orders" className='sidebar-option'>
          <img src={assets.order_icon1} alt="order icon" />
          <p>Orders</p>
        </NavLink>
        <NavLink to="/contact" className='sidebar-option'>
          <img src={assets.contact_icon} alt="contact icon" />
          <p>Contacts</p>
        </NavLink>
        <NavLink to="/users" className='sidebar-option'>
          <img src={assets.users_icon} alt="users icon" />
          <p>Users</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
