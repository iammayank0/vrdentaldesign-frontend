import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Main.css';

const Main = () => {
  const [serviceContents, setServiceContents] = useState([]);

  useEffect(() => {
    // Fetch service contents from the backend
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

  return (
    <div>
      {/* Services Area */}
      <section className='services-area'>
        <div className="container-services">
          <div className='service-area'>
            {serviceContents.map((service) => (
              <div key={service._id} className="service-content">
                <span className='service-title'>{service.subTitle}</span>
                <h2>{service.title}</h2>
                <p>The concept of VR Dental Design arose from the need to address the challenges of all modern dentists.</p>
                {/* Render description */}
                <ul>
                  {service.description.map((item, index) => (
                    <p key={index}>✅{item}</p>
                  ))}
                </ul>
                {/* Render images and titles */}
                <div className="service-img">
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
