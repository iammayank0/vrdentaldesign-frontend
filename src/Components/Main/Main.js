import React from 'react';
import { FaPhone } from "react-icons/fa";
import './Main.css';
import CTAbg from "../../Assets/images/cta-bg.jpeg";


const Main = () => {

  return (
    <div>
      

      {/* CTA area */}
      <section className='CTA-area' style={{ backgroundImage: `url(${CTAbg})` }}>
        <div className='container-CTA'>
          <div className="cta-content">
            <h2>Instant Design Solution for your Digital Crowns</h2>
            <p>Get emergency assistance for Crowns/Bridges within 2 Hours.</p>
            <a href="#/" className='call-us'><FaPhone />01294009388</a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Main;
