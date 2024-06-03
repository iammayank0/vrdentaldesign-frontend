// frontend/src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../Assets/images/logo.png';
import { FaPhone } from 'react-icons/fa';
import { SiMinutemailer } from 'react-icons/si';
import { IoMenuSharp, IoClose } from 'react-icons/io5';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const iconMap = {
  FaFacebook: FaFacebook,
  FaTwitter: FaTwitter,
  FaLinkedin: FaLinkedin,
  FaInstagram: FaInstagram,
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarItems, setNavbarItems] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    fetchNavbarItems();
    fetchContactInfo();
    fetchSocialLinks();
  }, []);

  const fetchNavbarItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/navbar');
      const data = await response.json();
      setNavbarItems(data);
    } catch (error) {
      console.error('Error fetching navbar items:', error);
    }
  };

  const fetchContactInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact-info');
      const data = await response.json();
      setContactInfo(data);
    } catch (error) {
      console.error('Error fetching contact info:', error);
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/social-links');
      const data = await response.json();
      setSocialLinks(data);
    } catch (error) {
      console.error('Error fetching social links:', error);
    }
  };

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
          {socialLinks.map((link, index) => {
            const IconComponent = iconMap[link.icon];
            return (
              <a key={index} href={link.url}>
                <IconComponent className='icon' />
              </a>
            );
          })}
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
};

export default Navbar;
