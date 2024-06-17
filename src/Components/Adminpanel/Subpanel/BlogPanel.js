import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Panel.css';

const BlogPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogTexts, setBlogTexts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    image: null,
    link: ''
  });
  const [editingBlog, setEditingBlog] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const [editingBlogText, setEditingBlogText] = useState(false);
  const [editBlogTextId, setEditBlogTextId] = useState(null);

  useEffect(() => {
    fetchBlogs();
    fetchBlogTexts();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchBlogTexts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blog-texts');
      setBlogTexts(response.data);
    } catch (error) {
      console.error('Error fetching blog texts:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'image' ? files[0] : value
    });
  };

  const handleEditBlog = (blog) => {
    setFormData({
      title: blog.title || '',
      date: blog.date || '',
      image: null,
      link: blog.link || ''
    });
    setEditingBlog(true);
    setEditBlogId(blog._id);
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('link', formData.link);

      const response = await axios.put(`http://localhost:5000/api/blogs/${editBlogId}`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        fetchBlogs();
        setFormData({
          title: '',
          date: '',
          image: null,
          link: ''
        });
        setEditingBlog(false);
        setEditBlogId(null);
      } else {
        console.error('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        fetchBlogs();
      } else {
        console.error('Deletion failed:', response.statusText);
      }
    } catch (error) {
      console.error('Deletion error:', error);
    }
  };

  const handleEditBlogText = (blogText) => {
    setFormData({
      title: blogText.title || '',
      heading: blogText.heading || '',
      description: blogText.description || ''
    });
    setEditingBlogText(true);
    setEditBlogTextId(blogText._id);
  };

  const handleUpdateBlogText = async (e) => {
    e.preventDefault();
    try {
      const { title, heading, description } = formData;
      const response = await axios.put(`http://localhost:5000/api/blog-texts/${editBlogTextId}`, {
        title,
        heading,
        description
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        fetchBlogTexts();
        setFormData({
          title: '',
          heading: '',
          description: ''
        });
        setEditingBlogText(false);
        setEditBlogTextId(null);
      } else {
        console.error('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div className="admin-panel-container">
      <h2 className="admin-panel-heading">Blog Panel</h2>

      {/* Form for creating or editing Blog */}
      {editingBlog || !editingBlogText ? (
        <form className="admin-form" onSubmit={editingBlog ? handleUpdateBlog : null}>
          <div>
            <label htmlFor="image">Image:</label>
            <input type="file" name="image" onChange={handleChange} accept="image/*" />
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" value={formData.title || ''} onChange={handleChange} placeholder="Title" required />
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <input type="text" name="date" value={formData.date || ''} onChange={handleChange} placeholder="Date" required />
          </div>
          <div>
            <label htmlFor="link">Link:</label>
            <input type="text" name="link" value={formData.link || ''} onChange={handleChange} placeholder="Link" required />
          </div>
          <button type="submit">{editingBlog ? 'Update' : 'Create'}</button>
          {editingBlog && <button type="button" onClick={() => { setEditingBlog(false); setEditBlogId(null); }}>Cancel</button>}
        </form>
      ) : null}

      {/* List of Blog Posts */}
      <div className="blog-list">
        {blogs.map(blog => (
          <div key={blog._id} className="blog-item">
            <h3>{blog.title}</h3>
            <p>Date: {blog.date}</p>
            <p>Link: {blog.link}</p>
            <img src={blog.image} alt={blog.title} />
            <button onClick={() => handleEditBlog(blog)}>Edit</button>
            <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Form for editing Blog Text */}
      {editingBlogText ? (
        <form className="admin-form" onSubmit={handleUpdateBlogText}>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" value={formData.title || ''} onChange={handleChange} placeholder="Title" required />
          </div>
          <div>
            <label htmlFor="heading">Heading:</label>
            <input type="text" name="heading" value={formData.heading || ''} onChange={handleChange} placeholder="Heading" required />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea name="description" value={formData.description || ''} onChange={handleChange} placeholder="Description" required />
          </div>
          <button type="submit">Update</button>
          <button type="button" onClick={() => { setEditingBlogText(false); setEditBlogTextId(null); }}>Cancel</button>
        </form>
      ) : null}

      {/* List of Blog Texts */}
      <div className="blog-text-list">
        {blogTexts.map(blogText => (
          <div key={blogText._id} className="blog-text-item">
            <h3>{blogText.title}</h3>
            <p>Heading: {blogText.heading}</p>
            <p>Description: {blogText.description}</p>
            <button onClick={() => handleEditBlogText(blogText)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPanel;
