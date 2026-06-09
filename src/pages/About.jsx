import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
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
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">HOME</Link> <span>/</span> ABOUT</div>
        <h1 className="page-hero-title">About <span className="accent">Me</span></h1>
        <p className="page-hero-sub">// WHO AM I? </p>
      </div>

      <section>
        <div className="about-grid">
          <div className="profile-photo-wrap reveal">
            <div className="profile-photo-frame">
              <div className="photo-corner photo-corner-tl"></div>
              <div className="photo-corner photo-corner-tr"></div>
              <div className="photo-corner photo-corner-bl"></div>
              <div className="photo-corner photo-corner-br"></div>
              <img src="/assets/images/profile/photo.png" alt="Salvin Sebastian" onError={(e) => { e.target.style.display='none'; }} />
              <div className="placeholder-icon" style={{display: 'none'}}>👤</div>
            </div>
            <div className="about-label">TARGET ACQUIRED</div>
          </div>

          <div className="about-info reveal reveal-delay-1">
            <h3>Initializing Profile...</h3>
            <p>
              I am a Cybersecurity enthusiast and aspiring Ethical Hacker with a deep passion for exploring digital landscapes, finding vulnerabilities, and learning how to secure systems.
            </p>
            <p>
              My journey began out of curiosity about how things work behind the scenes, which led me to programming, networking, and ultimately cybersecurity. I spend my time participating in CTFs, reading security writeups, and developing tools.
            </p>

            <div className="info-grid">
              <div className="info-item">
                <span className="label">ROLE</span>
                <span className="value">Cybersecurity Student</span>
              </div>
              <div className="info-item">
                <span className="label">LOCATION</span>
                <span className="value">Earth</span>
              </div>
              <div className="info-item">
                <span className="label">INTERESTS</span>
                <span className="value">Ethical Hacking, Web Dev</span>
              </div>
              <div className="info-item">
                <span className="label">STATUS</span>
                <span className="value" style={{color: 'var(--neon-cyan)'}}>Available for Collaboration</span>
              </div>
            </div>

            <div style={{marginTop: '2rem'}}>
              <a href="/assets/images/profile/profile.pdf" className="btn btn-solid" download>DOWNLOAD RESUME</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

