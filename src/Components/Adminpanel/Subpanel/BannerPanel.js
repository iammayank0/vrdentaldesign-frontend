import React, { useState, useEffect } from 'react';

const BannerPanel = () => {
    const [bannerContent, setBannerContent] = useState([]);

    useEffect(() => {
      fetchBannerContent();
    }, []);

    const fetchBannerContent = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/banner');
          const data = await response.json();
          setBannerContent(data);
        } catch (error) {
          console.error('Error fetching banner content:', error);
        }
      };

  return (
    <div>
      
    </div>
  )
}

export default BannerPanel
