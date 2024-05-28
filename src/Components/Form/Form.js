import React from 'react';
import './Form.css';
import { CiUser, CiMail, CiPhone } from "react-icons/ci";
import { RiMessage2Line } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";

const Form = () => {
  return (
    <div className='container'>
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
          <div className="button">
            <button type="submit" className="submit-button">
              SEND ENQUIRY
              <span className="icon-circle"><FaArrowRight /></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
