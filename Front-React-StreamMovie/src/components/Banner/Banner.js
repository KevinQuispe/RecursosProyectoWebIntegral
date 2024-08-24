import React from 'react';
import './Banner.css';

const Banner = ({ backgroundImage, height, children }) => {
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: height,
      }}
    >
      <div className="banner-content">
        {children}
      </div>
    </div>
  );
};

export default Banner;
