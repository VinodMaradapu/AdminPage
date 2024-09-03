import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/AdminpageNavbar';
import SecondNavbar from './components/SecondNavbar';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included
import VendorManagement from './components/VendorManagement';
  
const App = () => {
  return (
    <Router>
      <div>
        <MyNavbar /> {/* Main Navbar */}
        <SecondNavbar /> {/* Second Navbar */}
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} /> {/* Dashboard Route */}
            <Route path="/VendorManagement" element={<VendorManagement />} />
            {/* Add additional routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
