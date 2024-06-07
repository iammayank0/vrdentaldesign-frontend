import React, { useState } from 'react';
import './Main.css';
import img1 from "../../Assets/images/about-img.jpg";
import img2 from "../../Assets/images/about-img1.jpg";
import signImage from "../../Assets/images/signature.png";
import { FaCheck } from 'react-icons/fa';

const Main = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div>
      <section className='about-area'>
        <div className="container-about">
          <div className="about-img-container">
            <div className='about-image' style={{'--position': `${sliderPosition}%`}}>
              <div className="content-image">
                <img src={img1} alt='img1' className='image-before slider-image' />
                <img src={img2} alt='img2' className='image-after slider-image' />
              </div>
              <input type="range" min="0" max="100" value={sliderPosition} onChange={handleSliderChange} aria-label='Percentage of before photo shown' className='slider'/>
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
            <span className='subTitle'>WHO WE ARE</span>
            <h2>Let's Smile and Rise together</h2>
            <p>With a vision "Let's Smile and Rise Together", we are a premier dental designing company, passionately dedicated to transforming dental spaces into extraordinary works of art. With a rich blend of artistic flair and technical expertise, we create captivating environments that inspire both dental laboratories and dental practices. Our team of skilled technicians and designers work closely with dental professionals, crafting customized designs that harmonize aesthetics, functionality, and ergonomic considerations. From concept to completion, we meticulously orchestrate every detail, incorporating innovative technologies and expertise to elevate the dental experience. With our unwavering commitment to excellence, we have earned a reputation as pioneers in dental CAD designing, setting new benchmarks and reshaping the landscape of the digital dental industry across the globe. To meet all the requirements, we embrace all the verticals of Dental prosthetics and Designing as mentioned</p>
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
    </div>
  );
};

export default Main;
