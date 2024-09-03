import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'; // Import NavDropdown for dropdown menu
import { FaUser } from 'react-icons/fa'; // Import account icon from react-icons
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../Images/shopping.jpg';

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home" className="d-flex align-items-center">
        <img
          src={logo} // Path to your logo image
          alt="Logo"
          width="50" // Adjust width as needed
          height="30" // Adjust height as needed
          className="d-inline-block align-top"
        />
        <span className="ms-3">MyBrand</span> {/* Added Bootstrap class ms-3 for spacing */}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <NavDropdown
            title={<><FaUser className="me-2" /> My Account</>}
            id="basic-nav-dropdown"
            align="end" 
          >
            <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
