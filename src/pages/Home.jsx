import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const elementVisible = 150;
      reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    // Typing effect
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
      const words = JSON.parse(typingText.getAttribute('data-words') || '[]');
      let wordIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      const type = () => {
        const currentWord = words[wordIndex];
        if (isDeleting) {
          typingText.textContent = currentWord.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typingText.textContent = currentWord.substring(0, charIndex + 1);
          charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentWord.length) {
          typeSpeed = 2000;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
      };
      if(words.length > 0) type();
    }

    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <div className="page-wrapper">
      <section className="hero">
        <div className="hero-content reveal">
          <div className="hero-tag">STUDENT</div>

          <h1 className="hero-name glitch" data-text="SALVIN SEBASTIAN">
            <span className="highlight">SALVIN</span> SEBASTIAN
          </h1>

          <p className="hero-subtitle">ETHICAL HACKING ENTHUSIAST</p>

          <p className="hero-bio">
            Passionate cybersecurity student dedicated to understanding digital threats and building a safer internet.
            Exploring the intersection of technology, ethics, and security.
          </p>

          <div className="typing-wrap">
            <span className="typing-prefix">root@kali:~$</span>
            <span className="typing-text" data-words='["Cybersecurity","Ethical Hacking","Python Programming","Java Programming","Network Scanning","JavaScript","Web Development"]'></span>
            <span className="typing-cursor"></span>
          </div>

          <div className="hero-cta">
            <Link to="/projects" className="btn btn-solid">VIEW PROJECTS</Link>
            <Link to="/certificates" className="btn">CERTIFICATES</Link>
            <Link to="/contact" className="btn">CONTACT ME</Link>
            <a href="/assets/images/profile/profile.pdf" className="btn" download>⬇ DOWNLOAD CV</a>
          </div>
        </div>

        <div style={{position: 'absolute', bottom: '2rem', right: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)'}}>
          SYS: <span id="hex-clock">0xREADY</span>
        </div>
      </section>

      <section style={{padding: '2rem 2rem 5rem'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div className="stats-row" style={{display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <div className="stat-card card reveal" style={{flex: 1, minWidth: '200px', padding: '2rem', textAlign: 'center'}}>
              <div className="stat-number" style={{fontSize: '3rem', color: 'var(--neon-green)'}}>4+</div>
              <div className="stat-label" style={{fontFamily: 'var(--font-mono)'}}>PROJECTS</div>
            </div>
            <div className="stat-card card reveal reveal-delay-1" style={{flex: 1, minWidth: '200px', padding: '2rem', textAlign: 'center'}}>
              <div className="stat-number" style={{fontSize: '3rem', color: 'var(--neon-green)'}}>10+</div>
              <div className="stat-label" style={{fontFamily: 'var(--font-mono)'}}>CERTIFICATES</div>
            </div>
            <div className="stat-card card reveal reveal-delay-2" style={{flex: 1, minWidth: '200px', padding: '2rem', textAlign: 'center'}}>
              <div className="stat-number" style={{fontSize: '3rem', color: 'var(--neon-green)'}}>3+</div>
              <div className="stat-label" style={{fontFamily: 'var(--font-mono)'}}>YEARS LEARNING</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem'}}>
        <div className="section-header reveal">
          <span className="section-tag">// EXPERTISE</span>
          <h2 className="section-title">Core <span className="accent">Skills</span></h2>
          <div className="section-divider"></div>
        </div>

        <div className="skills-grid">
          <div className="skill-card card reveal"><span className="skill-icon">🛡️</span><span className="skill-name">Cyber</span><span className="skill-cat">Security</span></div>
          <div className="skill-card card reveal reveal-delay-1"><span className="skill-icon">🐍</span><span className="skill-name">Python</span><span className="skill-cat">Programming</span></div>
          <div className="skill-card card reveal reveal-delay-2"><span className="skill-icon">☕︎</span><span className="skill-name">Java</span><span className="skill-cat">Programming</span></div>
          <div className="skill-card card reveal reveal-delay-3"><span className="skill-icon">JS</span><span className="skill-name">JavaScript</span></div>
        </div>

        <div style={{textAlign: 'center', marginTop: '2.5rem'}}>
          <Link to="/skills" className="btn">VIEW ALL SKILLS</Link>
        </div>
      </section>
    </div>
  );
}