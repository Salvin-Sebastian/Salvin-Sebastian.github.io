import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaCalendarAlt, FaWrench, FaBookReader, FaSearch, FaMedal } from 'react-icons/fa';

export default function Gallery() {
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const elementVisible = 50;
      reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('revealed');
        }
      });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  const items = [
    { src: '/assets/images/certificates/cert6.webp', cat: 'Intership', title: 'ACHIEVEMENT', icon: <FaTrophy /> },
    { src: '/images/gallery/img2.jpg', cat: 'events', title: 'EVENT', icon: <FaCalendarAlt />, sub: 'Add image/gallery/img2.jpg' },
    { src: '/assets/images/certificates/cert9.webp', cat: 'Workshop', title: 'WORKSHOP', icon: <FaWrench />, sub: 'Add image/gallery/img3.jpg' },
    { src: '/assets/images/certificates/cert1.webp', cat: 'learning', title: 'LEARNING', icon: <FaBookReader /> },
    { src: '/assets/images/certificates/cert4.webp', cat: 'achievements', title: 'ACHIEVEMENT', icon: <FaMedal />, sub: 'Add image/gallery/img5.jpg' },
    { src: '/assets/images/certificates/cert3.webp', cat: 'events', title: 'EVENT', icon: <FaCalendarAlt /> },
    { src: '/assets/images/certificates/cert7.webp', cat: 'Python Workshop', title: 'WORKSHOP', icon: <FaWrench /> },
    { src: '/assets/images/certificates/cert10.webp', cat: 'learning', title: 'LEARNING', icon: <FaBookReader />, sub: 'Add image/gallery/img8.jpg' },
    { src: '/images/gallery/img9.jpg', cat: 'achievements', title: 'CTF WIN', icon: <FaMedal />, sub: 'Add image/gallery/img9.jpg' },
  ];

  const filtered = filter === 'all' ? items : items.filter(i => i.cat === filter);

  return (
    <div className="page-wrapper">
      <SEO title="Salvin Sebastian | Gallery" description="A collection of events, workshops, and achievements from Salvin Sebastian." />
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">HOME</Link> <span>/</span> GALLERY</div>
        <h1 className="page-hero-title">My <span className="accent">Gallery</span></h1>
        <p className="page-hero-sub">// ACHIEVEMENTS, EVENTS & LEARNING MEMORIES</p>
      </div>

      <section>
        <div style={{display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem'}} className="reveal">
          <button className={`btn btn-sm ${filter === 'all' ? 'btn-solid' : ''}`} onClick={() => setFilter('all')}>ALL</button>
          <button className={`btn btn-sm ${filter === 'achievements' ? 'btn-solid' : ''}`} onClick={() => setFilter('achievements')}>ACHIEVEMENTS</button>
          <button className={`btn btn-sm ${filter === 'events' ? 'btn-solid' : ''}`} onClick={() => setFilter('events')}>EVENTS</button>
          <button className={`btn btn-sm ${filter === 'workshops' ? 'btn-solid' : ''}`} onClick={() => setFilter('workshops')}>WORKSHOPS</button>
          <button className={`btn btn-sm ${filter === 'learning' ? 'btn-solid' : ''}`} onClick={() => setFilter('learning')}>LEARNING</button>
        </div>

        <div className="gallery-grid">
          {filtered.map((item, i) => (
            <div key={i} className="gallery-item reveal revealed" style={{opacity: 1}}>
              <div className="gallery-placeholder">
                <span style={{fontSize: '2rem', marginBottom: '8px'}}>{item.icon}</span>
                <span>{item.title}</span>
                {item.sub && <span style={{fontSize: '0.65rem', marginTop: '0.25rem'}}>{item.sub}</span>}
              </div>
              <div className="gallery-overlay">
                {item.src.startsWith('/assets') ? <img src={item.src} alt={item.title} /> : <FaSearch />}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}