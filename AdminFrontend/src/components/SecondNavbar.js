import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';

const SecondNavbar = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Navbar.Toggle aria-controls="admin-navbar-nav" />
      <Navbar.Collapse id="admin-navbar-nav">
        <Nav className="w-100 d-flex justify-content-around">
          <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/VendorManagement">Vendor Management</Nav.Link>
          <Nav.Link as={Link} to="/store-management">Store Management</Nav.Link>
          <Nav.Link as={Link} to="/factory-management">Factory Management</Nav.Link>
          <Nav.Link as={Link} to="/delivery-management">Delivery Management</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SecondNavbar;
