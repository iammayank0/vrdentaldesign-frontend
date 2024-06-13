import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Main.css';

import { FaCheck, FaArrowRight } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { CiUser, CiMail, CiPhone } from 'react-icons/ci';
import { RiMessage2Line } from 'react-icons/ri';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Main = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serviceContents, setServiceContents] = useState([]);
  const [funFacts, setFunFacts] = useState([]);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [aboutContent, setAboutContent] = useState(null);
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadingBanner, setloadingBanner] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [doctors, setDoctors] = useState([]);
  const [currentDoctorSlide, setCurrentDoctorSlide] = useState(0);
  const doctorsPerPage = window.innerWidth >= 1050 ? 4 : window.innerWidth >= 600 ? 3 : 2;
  const totalDoctorSlides = Math.ceil(doctors.length / doctorsPerPage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);

    const formattedData = {
      ...formData,
      phone: formData.phone.toString(),
    };

    try {
      const response = await fetch('http://localhost:5000/api/enquiry/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
        throw new Error(errorResponse.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success response:', result);

      alert('Enquiry submitted successfully');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please try again.');
    }
  };

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/about');
        const data = response.data;

        if (typeof data.services === 'string') {
          data.services = JSON.parse(data.services);
        }

        setAboutContent(data);
      } catch (error) {
        console.error('Error fetching About content:', error);
      }
    };

    fetchAboutContent();
  }, []);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  useEffect(() => {
    const fetchFunFacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fun-facts');
        setFunFacts(response.data);
      } catch (error) {
        console.error('Error fetching fun facts:', error);
      }
    };

    fetchFunFacts();
  }, []);

  useEffect(() => {
    const fetchServiceContents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServiceContents(response.data);
      } catch (error) {
        console.error('Error fetching service contents:', error);
      }
    };

    fetchServiceContents();
  }, []);

  useEffect(() => {
    // Fetch Why Choose Us content from the backend
    const fetchWhyChooseUsContent = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/whychooseus');
        if (!response.ok) {
          throw new Error('Failed to fetch Why Choose Us content');
        }
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error('Error fetching Why Choose Us content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWhyChooseUsContent();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors'); 
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDotClick = (index) => {
    setCurrentDoctorSlide(index);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!content) {
    return <div>No content available</div>;
  }

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

          {/* Enquiry form */}
          <section className='container'>
            <div className='content'>
              <span className='title'>ENQUIRY FORM</span>
              <h2>Enquiry Now</h2>

              <form className="enquiry-form" onSubmit={handleSubmit}>
                <div className='personal-details'>
                  <div className="text-name">
                    <CiUser className="icon" />
                    <div className="separator">|</div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="YOUR NAME"
                      required
                    />
                  </div>
                  <div className="text-email">
                    <CiMail className="icon" />
                    <div className="separator">|</div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="YOUR EMAIL"
                      required
                    />
                  </div>
                  <div className="text-num">
                    <CiPhone className="icon" />
                    <div className="separator">|</div>
                    <input
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="YOUR PHONE"
                      required
                    />
                  </div>
                </div>
                <div className="message">
                  <RiMessage2Line className="icon" />
                  <div className="separator">|</div>
                  <input
                    type="text"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    required
                  />
                </div>
                <div className="enquiry-button">
                  <button type="submit" className="submit-button">
                    SEND ENQUIRY
                    <span className="icon--circle"><FaArrowRight /></span>
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* ABOUT AREA */}
          <section className='about-area'>
            <div className="container-about">
              <div className="about-img-container">
                <div className='about-image' style={{ '--position': `${sliderPosition}%` }}>
                  <div className="content-image">
                    <img src={aboutContent.img1} alt='img1' className='image-before slider-image' />
                    <img src={aboutContent.img2} alt='img2' className='image-after slider-image' />
                  </div>
                  <input type="range" min="0" max="100" value={sliderPosition} onChange={handleSliderChange} aria-label='Percentage of before photo shown' className='slider' />
                  <div className="slider-line" aria-hidden="true"></div>
                  <div className="slider-button" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <rect width="256" height="256" fill="none"></rect>
                      <line
                        x1="128"
                        y1="40"
                        x2="128"
                        y2="216"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                      ></line>
                      <line
                        x1="96"
                        y1="128"
                        x2="16"
                        y2="128"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                      ></line>
                      <polyline
                        points="48 160 16 128 48 96"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                      ></polyline>
                      <line
                        x1="160"
                        y1="128"
                        x2="240"
                        y2="128"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                      ></line>
                      <polyline
                        points="208 96 240 128 208 160"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                      ></polyline>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="about-content">
                <span className='subTitle'>{aboutContent.subTitle}</span>
                <h2>{aboutContent.title}</h2>
                <p>{aboutContent.description}</p>
                <div className="content-list">
                  <div className="list1">
                    <ul>
                      {aboutContent.services && aboutContent.services.slice(0, Math.ceil(aboutContent.services.length / 2)).map((service, index) => (
                        <li key={index}><FaCheck className='icon' />{service}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="list2">
                    <ul>
                      {aboutContent.services && aboutContent.services.slice(Math.ceil(aboutContent.services.length / 2)).map((service, index) => (
                        <li key={index}><FaCheck className='icon' />{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="signature-content">
                  <div className="sign-img">
                    <img src={aboutContent.signImage} alt='signImage' />
                  </div>
                  <div className="sign-content">
                    <h5>{aboutContent.companyName}</h5>
                    <span>{aboutContent.founders}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* Fun Facts Area */}
      <section className="factArea">
        <div className="container-fact">
          <div className="content-fact">
            <div className="fact-text">
              <span className='fun-title'>FUN FACTS</span>
              <h2>Learn More About Our Success Stories</h2>
            </div>
            <div className="fact-num">
              {funFacts.map((fact, index) => (
                <div className="single-funFact" key={index}>
                  <h3>
                    <span className="odometer-digit">{fact.number}</span>
                    <sup>+</sup>
                  </h3>
                  <p>{fact.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Services Area */}
      <section className='services-area'>
        <div className="container-services">
          <div className='service-area'>
            {serviceContents.map((service) => (
              <div key={service._id} className="service-content">
                <span className='service-title'>{service.subTitle}</span>
                <h2>{service.title}</h2>
                <p></p>
                <p>The concept of VR Dental Design arose from the need to address the challenges of all modern dentists.</p>
                  {service.description.map((item, index) => (
                    <p key={index}>✅ {item}</p>
                  ))}
                  <p></p>
                  <div className="learnMore-button">
              <button type="button" className="learn-more-button">
                LEARN MORE
                <span className="icon-circle"><FaArrowRight /></span>
              </button>
            </div>
              </div>
            ))}
              {serviceContents.map((service) => (
                <div key={service._id} className="service-img">

                  <div className="single-service-box">
                    <img src={service.img1} alt={service.img1Title} className='service-img' />
                    <h3>{service.img1Title}</h3>
                    <a href="#/" className='read-more-btn'>READ MORE</a>
                  </div>
                  <div className="single-service-box">
                    <img src={service.img2} alt={service.img2Title} className='service-img' />
                    <h3>{service.img2Title}</h3>
                    <a href="#/" className='read-more-btn'>READ MORE</a>
                  </div>
                  <div className="single-service-box">
                    <img src={service.img3} alt={service.img3Title} className='service-img' />
                    <h3>{service.img3Title}</h3>
                    <a href="#/" className='read-more-btn'>READ MORE</a>
                  </div>
                  <div className="single-service-box">
                    <img src={service.img4} alt={service.img4Title} className='service-img' />
                    <h3>{service.img4Title}</h3>
                    <a href="#/" className='read-more-btn'>READ MORE</a>
                  </div>
                  </div>

              ))}
          </div>
        </div>
      </section>

      {/* why choose us */}
      <section className="why-choose-us-area">
        <div className="container-why-choose-us">
          <div className="why-choose-us-text">
            <div className="why-choose-us-text-content">
              <span className="why-choose-us-text-title">{content.sectionTitle}</span>
              <h2>{content.subtitle}</h2>
              <ul className="features-list">
                {content.features.map((feature, index) => (
                  <li key={index}>
                    <div className="feature">
                      <img src={feature.image} alt={feature.title} className='feature-img' /> {/* Use feature image */}
                      <span className='why-choose-us-icon'>{feature.title}</span>
                      <p className='why-choose-us-para'>{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="why-choose-us-img">
            <div className="why-choose-us-image">
              <img src={content.mainImage} alt="Why Choose Us" /> {/* Use main image */}
            </div>
          </div>
        </div>
      </section>




      {/* Doctor Area */}
      <section className="doctor-area">
        <div className="container-doctor">
          <div className="section-title">
            <span className="doctor-title">OUR SERVICES</span>
            <h2>Check our all Digital Dental Services</h2>
          </div>
          <div className="doctor-slides-carousel">
            <div
              className="doctor-slides"
              style={{ transform: `translateX(-${currentDoctorSlide * 100}%)` }}
            >
              {doctors.map((doctor, index) => (
                <div className="single-doctor-box" key={index}>
                  <div className="doctor-image">
                    <img src={doctor.img} alt={doctor.title} />
                  </div>
                  <div className="doctor-content">
                    <h3>{doctor.title}</h3>
                    <span>{doctor.time}</span> {/* Use the 'time' property from the fetched data */}
                    <ul className="social-icon">
                      {/* Render social links */}
                      <li>
                        <a href={doctor.socialLinks.facebook}>
                          <FaFacebook />
                        </a>
                      </li>
                      <li>
                        <a href={doctor.socialLinks.twitter}>
                          <FaTwitter />
                        </a>
                      </li>
                      <li>
                        <a href={doctor.socialLinks.linkedin}>
                          <FaLinkedin />
                        </a>
                      </li>
                      <li>
                        <a href={doctor.socialLinks.instagram}>
                          <FaInstagram />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="slides-dot">
              {Array.from({ length: totalDoctorSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`dot ${currentDoctorSlide === index ? "active" : ""}`}
                  onClick={() => handleDotClick(index)}
                >
                  <span>.</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>



        </>
      )}
    </div>
  );
};

export default Main;
