import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [navbarItems, setNavbarItems] = useState([]);
  const [formData, setFormData] = useState({ title: '', url: '', position: '' });
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    // Fetch navbar items from backend API upon component mount
    const fetchNavbarItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/navbar');
        const data = await response.json();
        setNavbarItems(data);
      } catch (error) {
        console.error('Error fetching navbar items:', error);
      }
    };

    fetchNavbarItems();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/navbar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Add the new item to the UI
        const newItem = await response.json();
        setNavbarItems([...navbarItems, newItem]);
        setFormData({ title: '', url: '', position: '' }); // Clear the form fields
      } else {
        // Handle create error
        console.error('Create failed:', response.statusText);
      }
    } catch (error) {
      console.error('Create error:', error);
    }
  };

  const handleEdit = (itemId) => {
    // Find the item to edit
    const itemToEdit = navbarItems.find(item => item._id === itemId);
    if (itemToEdit) {
      // Set the form data to the values of the item being edited
      setFormData({ title: itemToEdit.title, url: itemToEdit.url, position: itemToEdit.position });
      setEditingItemId(itemId);
    }
  };
  

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/navbar/${editingItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // Update the item in the UI
        const updatedItem = await response.json();
        setNavbarItems(navbarItems.map(item => item._id === editingItemId ? updatedItem : item));
        setFormData({ title: '', url: '', position: '' }); // Clear the form fields
        setEditingItemId(null); // Reset editing state
      } else {
        // Handle update error
        console.error('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/navbar/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        // Remove the item from the UI
        setNavbarItems(navbarItems.filter(item => item._id !== itemId));
      } else {
        // Handle delete error
        console.error('Delete failed:', response.statusText);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-heading">Admin Panel</h2>
      <form className="admin-form" onSubmit={editingItemId ? handleUpdate : handleCreate}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
        <input type="text" name="url" value={formData.url} onChange={handleChange} placeholder="URL" />
        <input type="number" name="position" value={formData.position} onChange={handleChange} placeholder="Position" />
        <button type="submit">{editingItemId ? 'Update' : 'Create'}</button>
        {editingItemId && <button type="button" onClick={() => setEditingItemId(null)}>Cancel</button>}
      </form>
      <ul className="navbar-item-list">
        {navbarItems.map((item, index) => (
          <li key={item._id}>
            Position: {index + 1} - {item.title} - {item.url}
            <button onClick={() => handleEdit(item._id)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
