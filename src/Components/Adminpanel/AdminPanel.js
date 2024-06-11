import React from 'react'
import NavPanel from './Subpanel/NavPanel'
import SlidePanel from './Subpanel/SlidePanel'
import AboutPanel from './Subpanel/AboutPanel'
import FactPanel from './Subpanel/FactPanel'

const AdminPanel = () => {
  return (
    <div>
      <NavPanel />
      <SlidePanel/>
      <AboutPanel />
      <FactPanel />
    </div>
  )
}

export default AdminPanel
