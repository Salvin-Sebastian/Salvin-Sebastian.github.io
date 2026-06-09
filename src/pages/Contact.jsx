import SEO from '../components/SEO';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaGraduationCap, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
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

  return (
    <div className="page-wrapper">
      <SEO title="Salvin Sebastian | Contact" description="Get in touch with Salvin Sebastian. Reach out via email, LinkedIn, or WhatsApp." />
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">HOME</Link> <span>/</span> CONTACT</div>
        <h1 className="page-hero-title">Get In <span className="accent">Touch</span></h1>
        <p className="page-hero-sub">// ESTABLISHING SECURE CHANNEL...</p>
      </div>

      <section>
        <div className="contact-grid">
          <div className="contact-cards">
            <div className="section-header" style={{textAlign: 'left', marginBottom: '2rem'}}>
              <span className="section-tag">// REACH ME AT</span>
              <h2 className="section-title" style={{fontSize: '1.6rem'}}>Contact Me <span className="accent">Through</span></h2>
              <div className="section-divider" style={{marginLeft: 0}}></div>
            </div>

            <a href="mailto:salvinsebastian308@gmail.com" className="contact-card card reveal">
              <div className="contact-icon"><FaEnvelope /></div>
              <div className="contact-info">
                <span className="label">EMAIL</span>
                <span className="value">salvinsebastian308@gmail.com</span>
              </div>
            </a>

            <a href="https://github.com/salvin-sebastian" className="contact-card card reveal reveal-delay-1" target="_blank" rel="noopener noreferrer">
              <div className="contact-icon"><FaGithub /></div>
              <div className="contact-info">
                <span className="label">GITHUB</span>
                <span className="value">github.com/salvin-sebastian</span>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/salvin-sebastian/" className="contact-card card reveal reveal-delay-2" target="_blank" rel="noopener noreferrer">
              <div className="contact-icon"><FaLinkedin /></div>
              <div className="contact-info">
                <span className="label">LINKEDIN</span>
                <span className="value">linkedin.com/in/salvin-sebastian</span>
              </div>
            </a>

            <a href="https://instagram.com/sa_lv_in_308" className="contact-card card reveal reveal-delay-3" target="_blank" rel="noopener noreferrer">
              <div className="contact-icon"><FaInstagram /></div>
              <div className="contact-info">
                <span className="label">INSTAGRAM</span>
                <span className="value">https://instagram.com/sa_lv_in_308</span>
              </div>
            </a>

            <a href="https://wa.me/918590796458" className="contact-card card reveal" target="_blank" rel="noopener noreferrer">
              <div className="contact-icon" style={{background: '#25D366', borderColor: '#25D366', color: '#000'}}><FaWhatsapp /></div>
              <div className="contact-info">
                <span className="label">WHATSAPP</span>
                <span className="value">+91 8590796458</span>
              </div>
            </a>

            <a href="https://app.mulearn.org/profile/salvinsebastian@mulearn" className="contact-card card reveal reveal-delay-1" target="_blank" rel="noopener noreferrer">
              <div className="contact-icon"><FaGraduationCap /></div>
              <div className="contact-info">
                <span className="label">MULEARN</span>
                <span className="value">mulearn.org/salvinsebastian@mulearn</span>
              </div>
            </a>
          </div>

          <div>
            <div className="section-header" style={{textAlign: 'left', marginBottom: '2rem'}}>
              <span className="section-tag">// SEND A MESSAGE</span>
              <h2 className="section-title" style={{fontSize: '1.6rem'}}>Drop a <span className="accent">Message</span></h2>
              <div className="section-divider" style={{marginLeft: 0}}></div>
            </div>

            <div className="card reveal" style={{padding: '2rem'}}>
              <form className="contact-form" autoComplete="off" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
                <div className="form-group">
                  <label htmlFor="name">// NAME</label>
                  <input type="text" id="name" name="name" placeholder="Enter your name..." required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">// EMAIL</label>
                  <input type="email" id="email" name="email" placeholder="Enter your email..." required />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">// SUBJECT</label>
                  <input type="text" id="subject" name="subject" placeholder="What's this about?" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">// MESSAGE</label>
                  <textarea id="message" name="message" placeholder="Type your message here..." required></textarea>
                </div>
                <button type="submit" className="btn btn-solid" style={{width: '100%', justifyContent: 'center'}}>
                  SEND MESSAGE ⟶
                </button>
              </form>
            </div>

            <div className="card reveal" style={{padding: '1.25rem 1.5rem', marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <span style={{fontSize: '1.8rem', color: 'var(--neon-green)'}}><FaMapMarkerAlt /></span>
              <div>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-green)', letterSpacing: '0.2em'}}>LOCATION</div>
                <div style={{fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600}}>In Alappuzha, Kerala, India</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}