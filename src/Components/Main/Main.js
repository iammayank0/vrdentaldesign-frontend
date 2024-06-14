import React, { useEffect, useState } from 'react';
import { FaPhone } from "react-icons/fa";
import axios from 'axios';
import './Main.css';

const Main = () => {
  const [ctaContent, setCtaContent] = useState(null);

  useEffect(() => {
    const fetchCTAContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/CTA');
        if (response.data.length > 0) {
          setCtaContent(response.data[0]);
        }
      } catch (err) {
        console.error('Error fetching CTA content:', err);
      }
    };
    fetchCTAContent();
  }, []);

  if (!ctaContent) {
    return <div>No CTA content available</div>;
  }

  return (
    <div>
      {/* CTA area */}
      <section className='CTA-area' style={{ backgroundImage: `url(${ctaContent.CTAbg})` }}>
        <div className='container-CTA'>
          <div className="cta-content">
            <h2>{ctaContent.ctaTitle}</h2>
            <p>{ctaContent.ctaSubtitle}</p>
            <a href={`tel:${ctaContent.phoneNumber}`} className='call-us'>
              <FaPhone />
              {ctaContent.phoneNumber}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
