import React, { useEffect, useState } from 'react';
import '../Main.css';

import { FaArrowRight } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Banner = () => {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loadingBanner, setloadingBanner] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        console.log('Fetching slides...');
        const fetchBannerContent = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/banner');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSlides(data);
            console.log('Slides fetched:', data);
          } catch (error) {
            console.error('Error fetching banner content:', error);
            setError('Failed to load banner content.');
          } finally {
            setloadingBanner(false);
          }
        };
    
        fetchBannerContent();
      }, []);
    
      useEffect(() => {
        if (slides.length > 0) {
          document.body.style.backgroundImage = `url(${slides[currentSlide].backgroundImageUrl})`;
        }
      }, [currentSlide, slides]);
    
      const goToPrevSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length) % slides.length);
      };
    
      const goToNextSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
      };


  return (
    <div>
      {loadingBanner && <div>loadingBanner...</div>}
      {error && <div>{error}</div>}

      {!loadingBanner && !error && (
        <>
          <div className="banner-section">
            <button
              className="arrow back"
              onClick={goToPrevSlide}
              aria-label="Previous Slide"
            >
              <div className="arrow-box">
                <IoIosArrowBack />
              </div>
            </button>

            <button
              className="arrow forward"
              onClick={goToNextSlide}
              aria-label="Next Slide"
            >
              <div className="arrow-box">
                <IoIosArrowForward />
              </div>
            </button>

            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
                role="tabpanel"
                aria-hidden={index !== currentSlide}
                aria-labelledby={`slide-${index}`}
              >
                <div className="main-banner">
                  <div className="text">
                    <h5 id={`slide-${index}`}>{slide.title}</h5>
                    <h1>{slide.heading}</h1>
                    <p>{slide.description}</p>
                    <div className="slide-button">
                      <button> KNOW MORE<span className="icon-circle"><FaArrowRight /></span></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </>
      )}
    </div>
  )
}

export default Banner
