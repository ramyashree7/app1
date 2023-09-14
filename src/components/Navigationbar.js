// Navbar.js
import React, { useState } from 'react';
import './Navigationbar.css'; // Import the CSS file for styling
import { FaBars, FaTimes } from 'react-icons/fa'; // Import the icons

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* <div className="navbar-logo">Logo</div> */}
      {/* Show mobile toggle bar in mobile view */}
      <div className="navbar-mobile-toggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <FaTimes className=" close-icon" />
        ) : (
          <FaBars className="menu-icon" />
        )}
      </div>
      {/* Show mobile sidebar in mobile view */}
      {isMobileMenuOpen && (
        <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <FaTimes className="close-icon" onClick={closeMobileMenu} />
          </li>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#landing">Landing</a></li>
          <li><a href="#gallery">Gallery</a></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
