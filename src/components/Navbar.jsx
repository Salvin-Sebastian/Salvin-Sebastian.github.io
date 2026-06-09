import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/skills', label: 'Skills' },
    { path: '/certificates', label: 'Certificates' },
    { path: '/projects', label: 'Projects' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav>
      <Link className="nav-logo" to="/">PORT<span>FOLIO</span></Link>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link 
              to={link.path} 
              className={location.pathname === link.path ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="nav-toggle" aria-label="Toggle menu" onClick={toggleMenu}>
        <span></span><span></span><span></span>
      </div>
    </nav>
  );
}