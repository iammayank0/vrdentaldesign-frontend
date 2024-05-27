import React from 'react';
import './Form.css'

const Form = () => {
  return (
    <div className='container'>
        <div className='content'>
            <span className='title'>ENQUIRY FORM</span>
            <h2>Enquiry Now</h2>

        <form action="#">
            <div className='personal-details'>
            <input type="text" placeholder="YOUR NAME" required />
            <input type="text" placeholder="YOUR EMAIL" required />
            <input type="number" placeholder="YOUR PHONE" required />
            </div>
            <div className="message">
            <input type="text" placeholder="Message" required />
            </div>
        </form>
        </div>
    </div>
  )
}

export default Form
