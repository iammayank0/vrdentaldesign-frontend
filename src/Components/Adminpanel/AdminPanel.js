import React from 'react';
import NavPanel from './Subpanel/NavPanel';
import SlidePanel from './Subpanel/SlidePanel';
import AboutPanel from './Subpanel/AboutPanel';
import FactPanel from './Subpanel/FactPanel';
import ServicePanel from './Subpanel/ServicePanel';
import WhyChooseUsPanel from './Subpanel/WhychooseusPanel';
import DoctorPanel from './Subpanel/DoctorPanel';

const AdminPanel = () => {
  return (
    <div>
      <NavPanel />
      {/* <SlidePanel/>
      <AboutPanel />
      <FactPanel />
      <ServicePanel />
      <WhyChooseUsPanel />
      <DoctorPanel /> */}
    </div>
  )
}

export default AdminPanel
