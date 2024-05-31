import React, { useState } from 'react';
import './Navbar.css';
import logo from "../../Assets/images/logo.png";

import { FaPhone, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import { IoMenuSharp, IoClose } from "react-icons/io5";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      <div className="contact-info">
        <div className='info'>
          <h3><FaPhone className='icon' /> 01294009388</h3>
          <h3><SiMinutemailer className='icon' /> info@vrdentaldesign.com</h3>
        </div>
        <div className='social'>
          <a href="/#"><FaFacebook className='icon' /></a>
          <a href="/#"><FaTwitter className='icon' /></a>
          <a href="/#"><FaLinkedin className='icon' /></a>
          <a href="/#"><FaInstagram className='icon' /></a>
        </div>
      </div>
      <nav className='main-nav'>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className={`menu-link ${menuOpen ? 'hidden' : ''}`}>
          <ul>
            <li><a href="/#">Home</a></li>
            <li><a href="/#">About</a></li>
            <li><a href="/#">Services</a></li>
            <li><a href="/#">Contact</a></li>
            <li><a href="/#">Gallery</a></li>
            <li><a href="/#">Dental Repairing</a></li>
            <li><a href="/#">Upload Cases</a></li>
            <li><a href="/#">Terms & Conditions</a></li>
          </ul>
        </div>
        <div className='menu-icons' onClick={handleMenuToggle}>
          {menuOpen ? <IoClose /> : <IoMenuSharp />}
        </div>
      </nav>
      {menuOpen && (
        <div className="dropdown-menu">
          <ul>
            <li><a href="/#">Home</a></li>
            <li><a href="/#">About</a></li>
            <li><a href="/#">Services</a></li>
            <li><a href="/#">Contact</a></li>
            <li><a href="/#">Gallery</a></li>
            <li><a href="/#">Dental Repairing</a></li>
            <li><a href="/#">Upload Cases</a></li>
            <li><a href="/#">Terms & Conditions</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
