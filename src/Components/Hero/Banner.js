import React, { useState, useEffect } from 'react';
import './Banner.css'

import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const slides = [
  {
    className: 'background1',
    title: 'YOU SCAN',
    heading: 'VR DESIGNS ALL DIGITAL DENTAL PROSTHETICS',
    description: "Our vision and mission is 'let's smile & rise together', wherein together do call for 'us and connects'.",
  },
  {
    className: 'background2',
    title: 'VR DESIGN FOR YOU',
    heading: 'MILLED AND 3D PRINT',
    description: 'You Deliver all prosthetic before the dentist TAT.'
  },
  {
    className: 'background3',
    title: 'DIGITAL WORLD',
    heading: 'UPLOAD YOUR CASES WITH NEW PARTNER',
    description: 'Click on Know More'
  }
];

const Hero = () => {

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
        className={`slide ${index === currentSlide ? 'active' : ''} 
                    ${index === 0 ? '.slide1' : ''} 
                    ${index === 1 ? '.slide2' : ''} 
                    ${index === 2 ? '.slide3' : ''}`}
      >
        <div className="main-banner">
          <div className="text">
            <h5>{slide.title}</h5>
            <h1>{slide.heading}</h1>
            <p>{slide.description}</p>
            <div className="button"><button> KNOW MORE<span className="icon-circle"> <FaArrowRight /></span></button></div>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Hero
