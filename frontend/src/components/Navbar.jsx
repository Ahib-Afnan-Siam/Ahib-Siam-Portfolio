import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { logo } from "../assets/images";

import { socialLinks } from "../constants";

const Navbar = ({ isIslandMoved }) => {
  return (
    <header className='header'>
      <NavLink to='/' className='ml-2'>
        <img src={logo} alt='logo' className='w-10 h-10 object-contain' />
      </NavLink>
      <nav className='navbar-nav'>
        <NavLink 
          to='/about' 
          className={({ isActive }) => isActive ? "text-blue-600" : "text-black" }
        >
          About
        </NavLink>
        <NavLink 
          to='/projects' 
          className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}
        >
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;