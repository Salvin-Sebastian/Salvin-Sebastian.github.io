import React, { useState } from 'react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`floating-contact ${isOpen ? 'open' : ''}`}>
      <div className="floating-menu">
        <a href="mailto:salvinsebastian308@gmail.com" className="floating-item" title="Email" target="_blank" rel="noopener noreferrer">
          📧
        </a>
        <a href="https://github.com/salvin-sebastian" className="floating-item" title="GitHub" target="_blank" rel="noopener noreferrer">
          ⌨️
        </a>
        <a href="https://www.linkedin.com/in/salvin-sebastian/" className="floating-item" title="LinkedIn" target="_blank" rel="noopener noreferrer">
          💼
        </a>
        <a href="https://instagram.com/sa_lv_in_308" className="floating-item" title="Instagram" target="_blank" rel="noopener noreferrer">
          📸
        </a>
        <a href="https://wa.me/918590796458" className="floating-item" title="WhatsApp" target="_blank" rel="noopener noreferrer">
          💬
        </a>
      </div>
      <button className="floating-main-btn" onClick={toggleMenu} title="Contact Me">
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
}
