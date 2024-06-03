import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../Assets/images/logo.png';
import { FaPhone } from 'react-icons/fa';
import { SiMinutemailer } from 'react-icons/si';
import { IoMenuSharp, IoClose } from 'react-icons/io5';
import { navbarItems, contactInfo, socialLinks } from '../../Constants/Constants';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      <div className="contact-info">
        <div className='info'>
          <h3><FaPhone className='icon' /> {contactInfo.phone}</h3>
          <h3><SiMinutemailer className='icon' /> {contactInfo.email}</h3>
        </div>
        <div className='social'>
          {socialLinks.map((link, index) => (
            <a key={index} href={link.url}><link.icon className='icon' /></a>
          ))}
        </div>
      </div>
      <nav className='main-nav'>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className={`menu-link ${menuOpen ? 'hidden' : ''}`}>
          <ul>
            {navbarItems.map((item, index) => (
              <li key={index}><a href={item.url}>{item.title}</a></li>
            ))}
          </ul>
        </div>
        <div className='menu-icons' onClick={handleMenuToggle}>
          {menuOpen ? <IoClose /> : <IoMenuSharp />}
        </div>
      </nav>
      {menuOpen && (
        <div className="dropdown-menu">
          <ul>
            {navbarItems.map((item, index) => (
              <li key={index}><a href={item.url}>{item.title}</a></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
