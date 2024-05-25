import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaPhone, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaArrowRight } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const slides = [
  {
    className: 'background1',
    title: 'YOU SCAN',
    heading: 'VR DESIGNS ALL DIGITAL DENTAL PROSTHETICS',
    description: "Our vision and mission is 'let's smile & rise together', wherein together do call for 'us and connects'.",
    buttonText: 'KNOW MORE'
  },
  {
    className: 'background2',
    title: 'VR DESIGN FOR YOU',
    heading: 'MILLED AND 3D PRINT',
    description: 'You Deliver all prosthetic before the dentist TAT.',
    buttonText: 'KNOW MORE'
  },
  {
    className: 'background3',
    title: 'DIGITAL WORLD',
    heading: 'Upload your Cases with New Partner',
    description: 'Click on Know More',
    buttonText: 'KNOW MORE'
  }
];

const Navbar = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
  };

  useEffect(() => {
    // Remove all background classes
    document.body.classList.remove('background1', 'background2', 'background3');
    // Add the current background class
    document.body.classList.add(slides[currentSlide].className);
  }, [currentSlide]);

  return (
    <div>
      <div className="container">
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
              <h2>vrdental</h2>
            </div>
            <div className='menu-link'>
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
          </nav>
        </div>
      </div>

      <div className="hero-section">
        <button className="arrow back" onClick={goToPrevSlide}>
          <div className="arrow-box">
            <IoIosArrowBack />
          </div>
        </button>

        <button className="arrow forward" onClick={goToNextSlide}>
          <div className="arrow-box">
            <IoIosArrowForward />
          </div>
        </button>

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="main-banner">
            <div className="text">
              <h5>{slide.title}</h5>
              <h1>{slide.heading}</h1>
              <p>{slide.description}</p>
              <div className="button"><button> {slide.buttonText}<span className="icon-circle"> <FaArrowRight /></span></button></div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
