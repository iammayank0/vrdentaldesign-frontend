import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Panel.css"

const WhyChooseUsPanel = () => {
  const [id, setId] = useState('');
  const [sectionTitle, setSectionTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [features, setFeatures] = useState([]);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current "Why Choose Us" content when component mounts
    const fetchWhyChooseUsContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/whychooseus');
        const { _id, image, sectionTitle, subtitle, features } = response.data;
        setId(_id);
        setImg(image);
        setSectionTitle(sectionTitle);
        setSubtitle(subtitle);
        setFeatures(features);
      } catch (error) {
        console.error('Error fetching Why Choose Us content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWhyChooseUsContent();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][field] = value;
    setFeatures(updatedFeatures);
  };

  const handleImgChange = (event) => {
    setImg(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('sectionTitle', sectionTitle);
      formData.append('subtitle', subtitle);
      formData.append('image', img);
      formData.append('features', JSON.stringify(features));

      await axios.put(`http://localhost:5000/api/whychooseus/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Why Choose Us content updated successfully!');
    } catch (error) {
      console.error('Error updating Why Choose Us content:', error);
      alert('Failed to update Why Choose Us content. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='whychoose-panel'>
      <h2>Update Why Choose Us Content</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sectionTitle">Section Title:</label>
          <input type="text" id="sectionTitle" value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="subtitle">Subtitle:</label>
          <input type="text" id="subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
        </div>
        <div>
          <h3>Features:</h3>
          {features.map((feature, index) => (
            <div key={index}>
              <label htmlFor={`featureTitle${index}`}>Title:</label>
              <input type="text" id={`featureTitle${index}`} value={feature.title} onChange={(e) => handleInputChange(index, 'title', e.target.value)} />
              <label htmlFor={`featureDescription${index}`}>Description:</label>
              <input type="text" id={`featureDescription${index}`} value={feature.description} onChange={(e) => handleInputChange(index, 'description', e.target.value)} />
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImgChange} accept="image/*" />
        </div>
        <button type="submit">Update Content</button>
      </form>
    </div>
  );
};

export default WhyChooseUsPanel;
