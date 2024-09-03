import React, { useState, useEffect } from 'react';
import { Table, Form, Button, InputGroup, Pagination, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaUndo } from 'react-icons/fa';

const VendorManagementPage = () => {
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    PhoneNumber: '',
    Active: true,
  });
  const [editUser, setEditUser] = useState(null);
  const [users, setUsers] = useState([]);

  const recordsPerPage = 7;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/allVenders');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter(user =>
    (user.username.toLowerCase().includes(filter.toLowerCase()) ||
    user.email.toLowerCase().includes(filter.toLowerCase())) ||
    filter.trim() === ''
  );

  const totalUsers = filteredUsers.length;
  const activeUsers = filteredUsers.filter(user => user.Active).length;
  const totalPages = Math.ceil(totalUsers / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleShowAddUserForm = () => setShowAddUserForm(true);
  const handleCloseAddUserForm = () => setShowAddUserForm(false);

  const handleShowEditUserForm = (user) => {
    setEditUser(user);
    setShowEditUserForm(true);
  };
  const handleCloseEditUserForm = () => {
    setEditUser(null);
    setShowEditUserForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({
      ...editUser,
      [name]: value
    });
  };

  // const handleAddFormSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('http://localhost:5000/api/saveVenders', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(newUser),
  //     });
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`Error ${response.status}: ${errorText || 'Unknown error'}`);
  //     }
  //     const data = await response.json();
  //     // Add the new user to the beginning of the list
  //     setUsers([data, ...users]);
  //     // Reset the current page to 1
  //     setCurrentPage(1);
  //     handleCloseAddUserForm();
  //     setNewUser({ 
  //       username: '',
  //       email: '',
  //       PhoneNumber: '',
  //       Active: true,
  //     });
  //   } catch (error) {
  //     console.error('Error adding user:', error);
  //     alert(`Error adding user: ${error.message}`);
  //   }
  // };
  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/saveVenders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            // Concatenate all error messages
            const errorMessages = errorResponse.errors.map(err => err.msg).join(', ');
            throw new Error(`Error ${response.status}: ${errorMessages}`);
        }

        const data = await response.json();
        // Add the new user to the beginning of the list
        setUsers([data, ...users]);
        // Reset the current page to 1
        setCurrentPage(1);
        handleCloseAddUserForm();
        setNewUser({ 
            username: '',
            email: '',
            PhoneNumber: '',
            Active: true,
        });
    } catch (error) {
        console.error('Error adding user:', error);
        alert(`Error adding user: ${error.message}`);
    }
};


  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/updateVenders/${editUser.email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editUser),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText || 'Unknown error'}`);
      }
      const data = await response.json();
      setUsers(users.map(user => (user.email === data.email ? data : user)));
      handleCloseEditUserForm();
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      const response = await fetch(`http://localhost:5000/api/deleteVenders/${user.email}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText || 'Unknown error'}`);
      }
      setUsers(users.map(u => (u.email === user.email ? { ...u, Active: false } : u)));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleRestoreUser = async (user) => {
    try {
      const response = await fetch(`http://localhost:5000/api/restoreVenders/${user.email}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText || 'Unknown error'}`);
      }
      const data = await response.json();
      setUsers(users.map(u => (u.email === data.email ? data : u)));
    } catch (error) {
      console.error('Error restoring user:', error);
      alert(`Error restoring user: ${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-start align-items-center mb-3">
        <InputGroup style={{ width: '500px', marginLeft: 'auto', marginRight: '0' }}>
          <Form.Control 
            type="text" 
            placeholder="Filter by name or email" 
            value={filter}
            onChange={handleFilterChange}
          />
          <Button 
            variant="primary" 
            className="ms-2"
            style={{ width: '150px' }}  
            onClick={handleShowAddUserForm}
          >
            Add User
          </Button>
        </InputGroup>
      </div>

      <div className="mb-3" style={{ position: 'relative' }}>
        <span>Total Users: {totalUsers}</span>
        <span style={{ position: 'absolute', left: '1160px' }}>Active Users: {activeUsers}</span>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>PhoneNumber</th>
            <th>Active</th>
            <th>Created date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index} className={!user.Active ? 'bg-secondary text-white' : 'bg-light'}>
              <td>
                <i className="fas fa-user me-2"></i> {user.username}
              </td>
              <td>{user.email}</td>
              <td>{user.PhoneNumber}</td>
              <td>{user.Active ? 'True' : 'False'}</td>
              <td>{user.date}</td>
              <td>
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  className="me-2"
                  disabled={!user.Active} 
                  onClick={() => handleShowEditUserForm(user)}
                >
                  <FaEdit />
                </Button>
                {user.Active ? (
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => handleDeleteUser(user)}
                  >
                    <FaTrash />
                  </Button>
                ) : (
                  <Button 
                    variant="outline-success" 
                    size="sm" 
                    onClick={() => handleRestoreUser(user)}
                  >
                    <FaUndo />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center mt-3" style={{ marginLeft: '1150px' }}>
        <Pagination>
          <Pagination.Prev 
            onClick={handlePreviousPage} 
            disabled={currentPage === 1} 
          />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item 
              key={index + 1} 
              active={index + 1 === currentPage} 
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages} 
          />
        </Pagination>
      </div>

      {/* Add User Modal */}
      <Modal show={showAddUserForm} onHide={handleCloseAddUserForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                name="username" 
                value={newUser.username} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={newUser.email} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type="text" 
                name="PhoneNumber" 
                value={newUser.PhoneNumber} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Active</Form.Label>
              <Form.Check 
                type="checkbox" 
                name="Active" 
                checked={newUser.Active} 
                onChange={e => setNewUser({ ...newUser, Active: e.target.checked })} 
              />
            </Form.Group>
            <div className="float-end">
              <Button variant="primary" type="submit" className="me-2">
                Save Vendor
              </Button>
              <Button variant="secondary" onClick={handleCloseAddUserForm}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditUserForm} onHide={handleCloseEditUserForm}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editUser && (
            <Form onSubmit={handleEditFormSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  name="username" 
                  value={editUser.username} 
                  onChange={handleEditInputChange} 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  value={editUser.email} 
                  onChange={handleEditInputChange} 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control 
                  type="text" 
                  name="PhoneNumber" 
                  value={editUser.PhoneNumber} 
                  onChange={handleEditInputChange} 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Active</Form.Label>
                <Form.Check 
                  type="checkbox" 
                  name="Active" 
                  checked={editUser.Active} 
                  onChange={e => setEditUser({ ...editUser, Active: e.target.checked })} 
                />
              </Form.Group>
              <div className="float-end">
                <Button variant="primary" type="submit" className="me-2">
                  Update Vendor
                </Button>
                <Button variant="secondary" onClick={handleCloseEditUserForm}>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default VendorManagementPage;
