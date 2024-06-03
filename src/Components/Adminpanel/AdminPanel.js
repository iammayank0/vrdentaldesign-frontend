// src/components/AdminPanel/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import { authenticateUser, isAuthenticated, logout } from '../../utils/Auth';
import Login from '../Login/Login';

const AdminPanel = () => {
  const [navbarItems, setNavbarItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', url: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    const fetchNavbarItems = async () => {
      try {
        const response = await axios.get('/api/navbarItems', {
          headers: { Authorization: localStorage.getItem('authToken') }
        });
        setNavbarItems(response.data);
      } catch (error) {
        console.error('Error fetching navbar items:', error);
      }
    };

    fetchNavbarItems();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await authenticateUser(username, password);
      localStorage.setItem('authToken', response.token);
      setIsLoggedIn(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingItem) {
      setEditingItem({ ...editingItem, [name]: value });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        const response = await axios.put(`/api/navbarItems/${editingItem.id}`, editingItem, {
          headers: { Authorization: localStorage.getItem('authToken') }
        });
        setNavbarItems(navbarItems.map(item => (item.id === editingItem.id ? response.data : item)));
        setEditingItem(null);
      } else {
        const response = await axios.post('/api/navbarItems', newItem, {
          headers: { Authorization: localStorage.getItem('authToken') }
        });
        setNavbarItems([...navbarItems, { ...newItem, id: response.data.id }]);
        setNewItem({ title: '', url: '' });
      }
    } catch (error) {
      console.error('Error submitting navbar item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/navbarItems/${id}`, {
        headers: { Authorization: localStorage.getItem('authToken') }
      });
      setNavbarItems(navbarItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting navbar item:', error);
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={editingItem ? editingItem.title : newItem.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="url"
          value={editingItem ? editingItem.url : newItem.url}
          onChange={handleChange}
          placeholder="URL"
          required
        />
        <button type="submit">{editingItem ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {navbarItems.map((item) => (
          <li key={item.id}>
            {item.title} - {item.url}
            <div>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
