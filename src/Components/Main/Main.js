import React, { useState, useEffect } from 'react';
import './Main.css'

import { FaArrowRight, FaCheck, FaLongArrowAltRight, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CiUser, CiMail, CiPhone } from "react-icons/ci";
import { RiMessage2Line } from "react-icons/ri";
import img1 from "../../Assets/images/about-img.jpg";
// import img2 from "../../Assets/images/about-img1.jpg";
import signImage from "../../Assets/images/signature.png";
import serviceImg1 from "../../Assets/images/doctor-image/1.jpg";
import serviceImg2 from "../../Assets/images/doctor-image/2.jpg";
import serviceImg3 from "../../Assets/images/doctor-image/3.jpg";
import serviceImg4 from "../../Assets/images/doctor-image/4.jpg";
import whyChooseUsImg from "../../Assets/images/why-choose-img1.jpg";
import doctorImg1 from "../../Assets/images/doctor-image/1.jpg";
import doctorImg2 from "../../Assets/images/doctor-image/2.jpg";
import doctorImg3 from "../../Assets/images/doctor-image/3.jpg";
import doctorImg4 from "../../Assets/images/doctor-image/4.jpg";
import doctorImg5 from "../../Assets/images/doctor-image/5.jpg";
import doctorImg6 from "../../Assets/images/doctor-image/6.jpg";
import doctorImg7 from "../../Assets/images/doctor-image/7.jpg";
import doctorImg8 from "../../Assets/images/doctor-image/8.jpg";
import doctorImg9 from "../../Assets/images/doctor-image/9.jpg";
import doctorImg10 from "../../Assets/images/doctor-image/10.jpg";
import doctorImg11 from "../../Assets/images/doctor-image/11.jpg";
import doctorImg12 from "../../Assets/images/doctor-image/12.jpg";
import doctorImg13 from "../../Assets/images/doctor-image/3.jpg";

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

const Main = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDoctorSlide, setCurrentDoctorSlide] = useState(0);
  const doctorsPerPage = window.innerWidth >= 1050 ? 4 : window.innerWidth >= 600 ? 3 : 2;
  const doctors = [
    { img: doctorImg1, title: 'Crown & Bridge', time: 'Min 2Hr | Max 12Hr' },
    { img: doctorImg2, title: 'Screw-Retain-Crown', time: 'Min 2Hr | Max 12Hr' },
    { img: doctorImg3, title: 'CPD & RPD', time: 'Min 2Hr | Max 12Hr' },
    { img: doctorImg4, title: 'Night Guard', time: 'Min 2Hr | Max 12Hr' },
    { img: doctorImg5, title: 'INLAY-ONLAY', time: 'Min 2Hr | Max 12Hr' },
    { img: doctorImg6, title: 'VENEER', time: 'Min 2Hr | Max 12Hr' },
    { img: doctorImg7, title: 'SNAP ON SMILE', time: 'Min 2Hr | Max 12Hr' },
    { img: doctorImg8, title: 'CUSTOM TRAY', time: 'Min 2Hr | Max 12Hr' },
    { img: doctorImg9, title: 'MODEL CREATE', time: 'Min 2Hr | Max 12Hr' },
    { img: doctorImg10, title: 'SURGICAL GUIDE', time: 'Min 2Hr | Max 12Hr' },
    { img: doctorImg11, title: 'DIGITAL DENTURE', time: 'Min 2Hr | Max 12Hr' },
    { img: doctorImg12, title: 'FLEXIBLE-DENTURE', time: 'Min 2Hr | Max 12Hr' },
    { img: doctorImg13, title: 'COSMETIC DENTISTRY', time: 'Min 2Hr | Max 12Hr' }
  ];

  const totalDoctorSlides = Math.ceil(doctors.length / doctorsPerPage);

  const handleDotClick = (index) => {
    setCurrentDoctorSlide(index);
  };
  

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
    <div className="banner-section">
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
    className={`slide ${index === currentSlide ? 'active' : ''} slide${index + 1}`}
  >
    <div className="main-banner">
      <div className="text">
        <h5>{slide.title}</h5>
        <h1>{slide.heading}</h1>
        <p>{slide.description}</p>
        <div className="button">
          <button> KNOW MORE<span className="icon-circle"><FaArrowRight /></span></button>
        </div>
      </div>
    </div>
  </div>
))}

    </div>

   {/* form */}

  <section className='container'>
      <div className='content'>
        <span className='title'>ENQUIRY FORM</span>
        <h2>Enquiry Now</h2>

        <form className="enquiry-form">
          <div className='personal-details'>
            <div className="text-name">
              <CiUser className="icon" />
              <div className="separator">|</div>
              <input type="text" placeholder="YOUR NAME" required />
            </div>
            <div className="text-email">
              <CiMail className="icon" />
              <div className="separator">|</div>
              <input type="email" placeholder="YOUR EMAIL" required />
            </div>
            <div className="text-num">
              <CiPhone className="icon" />
              <div className="separator">|</div>
              <input type="number" placeholder="YOUR PHONE" required />
            </div>
          </div>
          <div className="message">
            <RiMessage2Line className="icon" />
            <div className="separator">|</div>
            <input type="text" placeholder="Message" required />
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

    {/* About */}
    
    <section className='about-area'>
      <div className="container-about">
        <div className="content-image">
          <img src={img1} alt='img1' className='image-before' />
          {/* <img src={img2} alt='img1' /> */}
        </div>
        <div className="about-content">
          <span className='subTitle'>WHO WE ARE</span>
          <h2>Let's Smile and Rise together</h2>
          <p>With a vision "Let's Smile and Rise Together" , we are a premier dental designing company, passionately dedicated to transforming dental spaces into extraordinary works of art. With a rich blend of artistic flair and technical expertise, we create captivating environments that inspire both dental laboratories and dental practices. Our team of skilled technicians and designers work closely with dental professionals, crafting customized designs that harmonize aesthetics, functionality, and ergonomic considerations. From concept to completion, we meticulously orchestrate every detail, incorporating innovative technologies and expertise to elevate the dental experience. With our unwavering commitment to excellence, we have earned a reputation as pioneers in dental CAD designing, setting new benchmarks and reshaping the landscape of digital dental industry across the globe. To meet all the requirements, we embrace all the verticals of Dental prosthetics and Designing as mentioned</p>
          <div className="content-list">
            <div className="list1">
              <ul>
                <li><FaCheck className='icon' />Crown & Bridge</li>
                <li><FaCheck className='icon' />Inlay Onlay</li>
                <li><FaCheck className='icon' />Screw-Retain-Crown</li>
                <li><FaCheck className='icon' />Veneer</li>
                <li><FaCheck className='icon' />Snap on Smile</li>
                <li><FaCheck className='icon' />Custom Tray</li>
              </ul>
            </div>
            <div className="list2">
              <ul>
                <li><FaCheck className='icon' />CPD & RPD</li>
                <li><FaCheck className='icon' />Night GUARD</li>
                <li><FaCheck className='icon' />DIGITAL DENTURE</li>
                <li><FaCheck className='icon' />SURGICAL GUIDE</li>
                <li><FaCheck className='icon' />FLEXIBLE DENTURE</li>
                <li><FaCheck className='icon' />Model Create</li>
              </ul>
            </div>
          </div>
          <div className="signature-content">
            <div className="sign-img">
              <img src={signImage} alt='signImage' />
            </div>
            <div className="sign-content">
              <h5>VR DENTAL</h5>
              <span>Co-Founder & Managing Director - Rahul Rajput CDT, Co-Founder & CEO- Ravi Kumar, Co-Founder & Director - Satender</span>
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
            <div className="single-funFact">
              <h3>
                <span className="odometer-digit">120</span>
                <sup>+</sup>
              </h3>
              <p>Happy Labs</p>
            </div>
            <div className="single-funFact">
              <h3>
                <span className="odometer-digit">60</span>
                <sup>+</sup>
              </h3>
              <p>Expert Doctors</p>
            </div>
            <div className="single-funFact">
              <h3>
                <span className="odometer-digit">600,000</span>
                <sup>+</sup>
              </h3>
              <p>Cases Resolved</p>
            </div>
            <div className="single-funFact">
              <h3>
                <span className="odometer-digit">18</span>
                <sup>+</sup>
              </h3>
              <p>Award Winners</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Services Area */}

    <section className='services-area'>
      <div className="container-services">
        <div className='service-area'>
          <div className="service-content">
            <span className='service-title'>OUR SPECIALISATION</span>
            <h2>Catering to all of your Dental needs and Desires</h2>
            <p></p>
            <p>The concept of VR Dental Design arose from the need to address the challenges of all modern dentists.</p>
            <p>✅ High quality designs across a range of dental CAD products</p>
            <p>✅ Fast and reliable delivery with customized solutions</p>
            <p>✅ No need to invest in CAD design software and team</p>
            <p>✅ Live support to resolve your issues effectively and quickly</p>
            <p></p>
            <div className="learnMore-button">
              <button type="button" className="learn-more-button">
                LEARN MORE
                <span className="icon-circle"><FaArrowRight /></span>
              </button>
            </div>
          </div>
          <div className="service-img">
            <div className="single-service-box">
              <img src={serviceImg1} alt="VALPLAST FLEXIBLE" className='service-img' />
              <h3>VALPLAST FLEXIBLE</h3>
              <a href="#/" className='read-more-btn'>READ MORE <span className='arrow-btn'><FaLongArrowAltRight /></span></a>
            </div>
            <div className="single-service-box">
              <img src={serviceImg2} alt="COSMETIC DENTISTRY" className='service-img' />
              <h3>COSMETIC DENTISTRY</h3>
              <a href="#/" className='read-more-btn'>READ MORE <span className='arrow-btn'><FaLongArrowAltRight /></span></a>
            </div>
            <div className="single-service-box">
              <img src={serviceImg3} alt="INLAY ONLAY" className='service-img' />
              <h3>INLAY ONLAY</h3>
              <a href="#/" className='read-more-btn'>READ MORE <span className='arrow-btn'><FaLongArrowAltRight /></span></a>
            </div>
            <div className="single-service-box">
              <img src={serviceImg4} alt="VENEER" className='service-img' />
              <h3>VENEER</h3>
              <a href="#/" className='read-more-btn'>READ MORE <span className='arrow-btn'><FaLongArrowAltRight /></span></a>
            </div>
          </div>
        </div>
      </div>
    </section>

     {/* why choose us */}

     <section className="why-choose-us-area">
    <div className="container-why-choose-us">
          <div className="why-choose-us-text">
            <div className="why-choose-us-text-content">
              <span className="why-choose-us-text-title">WHY YOU CHOOSE US</span>
              <h2>What we do why we are exceptional than others</h2>
              <ul className="features-list">
                <li>
                  <div className="feature">
                    <FaUserDoctor />
                    <span>PROFESSIONAL STAFF</span>
                    <p>All experts in Digital Dentistry.</p>
                  </div>
                </li>
                <li>
                  <div className="feature">
                    <FaUserDoctor />
                    <span>EASY TO IMPORT/EXPORT</span>
                    <p>Direct import design files from our system.</p>
                  </div>
                </li>
                <li>
                  <div className="feature">
                    <FaUserDoctor />
                    <span>24/6 SUPPORT</span>
                    <p>We provide 24/6 support to our labs.</p>
                  </div>
                </li>
                <li>
                  <div className="feature">
                    <FaUserDoctor />
                    <span>3 LEVEL QUALITY TESTING</span>
                    <p>We provide high-quality Designs.</p>
                  </div>
                </li>
              </ul>
            </div>
        </div>
        <div className="why-choose-us-img">
          <div className="why-choose-us-image">
            <img src={whyChooseUsImg} alt="Why Choose Us" />
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
                  <span>Min 2Hr | Max 12Hr</span>
                  <ul className="social-icon">
                    <li>
                      <a href="#/">
                        <FaFacebook />
                      </a>
                    </li>
                    <li>
                      <a href="#/">
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a href="#/">
                        <FaLinkedin />
                      </a>
                    </li>
                    <li>
                      <a href="#/">
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



    </div>
  )
}

export default Main
