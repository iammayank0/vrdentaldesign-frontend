// src/components/FooterPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FooterPanel = () => {
  const [footerData, setFooterData] = useState({
    _id: '',
    description: { logo: '', text: '' },
    socialLinks: { facebook: '', twitter: '', linkedin: '', instagram: '' },
    quickLinks: [{ text: '', url: '' }],
    contactInfo: [{ location: '', phone: '' }],
    copyright: ''
  });

  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    // Fetch the current footer data from the server
    const fetchFooterData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/footer');
        setFooterData(response.data); // Set state with fetched data
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchFooterData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.'); // Split nested field name

    if (child) {
      setFooterData({
        ...footerData,
        [parent]: {
          ...footerData[parent],
          [child]: value,
        },
      });
    } else {
      setFooterData({
        ...footerData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('logo', logoFile);
    formData.append('text', footerData.description.text);
    formData.append('socialLinks', JSON.stringify(footerData.socialLinks));
    formData.append('quickLinks', JSON.stringify(footerData.quickLinks));
    formData.append('contactInfo', JSON.stringify(footerData.contactInfo));
    formData.append('copyright', footerData.copyright);

    try {
      const response = await axios.put(`http://localhost:5000/api/footer/${footerData._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFooterData(response.data);
      alert('Footer updated successfully');
    } catch (error) {
      console.error('Error updating footer:', error);
      alert('Failed to update footer');
    }
  };

  return (
    <div>
      <h1>Edit Footer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Logo:</label>
          {footerData.description.logo && (
            <img src={footerData.description.logo} alt="Logo" style={{ height: '50px' }} />
          )}
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>Text:</label>
          <input
            type="text"
            name="description.text"
            value={footerData.description.text}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Facebook:</label>
          <input
            type="text"
            name="socialLinks.facebook"
            value={footerData.socialLinks.facebook}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Twitter:</label>
          <input
            type="text"
            name="socialLinks.twitter"
            value={footerData.socialLinks.twitter}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>LinkedIn:</label>
          <input
            type="text"
            name="socialLinks.linkedin"
            value={footerData.socialLinks.linkedin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Instagram:</label>
          <input
            type="text"
            name="socialLinks.instagram"
            value={footerData.socialLinks.instagram}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Quick Links:</label>
          {footerData.quickLinks.map((link, index) => (
            <div key={index}>
              <input
                type="text"
                name={`quickLinks[${index}].text`}
                value={link.text}
                onChange={handleChange}
              />
              <input
                type="text"
                name={`quickLinks[${index}].url`}
                value={link.url}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <div>
          <label>Contact Info:</label>
          {footerData.contactInfo.map((info, index) => (
            <div key={index}>
              <input
                type="text"
                name={`contactInfo[${index}].location`}
                value={info.location}
                onChange={handleChange}
              />
              <input
                type="text"
                name={`contactInfo[${index}].phone`}
                value={info.phone}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <div>
          <label>Copyright:</label>
          <input
            type="text"
            name="copyright"
            value={footerData.copyright}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default FooterPanel;
