import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import AdminPanel from './Components/Adminpanel/AdminPanel';
import Main from './Components/Main/Main'

import './App.css'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Main />
        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
