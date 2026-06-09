import SEO from '../components/SEO';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaPython, FaJava, FaJsSquare, FaGlobe, FaChartBar, FaDownload } from 'react-icons/fa';
import { SiCplusplus } from 'react-icons/si';

export default function Home() {
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

  useEffect(() => {
    const textEl = document.querySelector('.typing-text');
    if (!textEl) return;
    const words = JSON.parse(textEl.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        textEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        textEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 1500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }
      setTimeout(type, typeSpeed);
    };
    const timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-wrapper">
      <SEO title="Salvin Sebastian | Cybersecurity Student" description="Welcome to the portfolio of Salvin Sebastian, an ethical hacking enthusiast." />
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
            <a href="/assets/images/profile/profile.pdf" className="btn" download="Salvin_Sebastian_Resume.pdf"><FaDownload style={{marginRight:'8px'}} /> DOWNLOAD CV</a>
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
          <div className="skill-card card reveal"><span className="skill-icon"><FaShieldAlt /></span><span className="skill-name">Cyber </span><span className="skill-cat">Security</span></div>
          <div className="skill-card card reveal reveal-delay-1"><span className="skill-icon"><FaPython /></span><span className="skill-name">Python </span><span className="skill-cat">Programming</span></div>
          <div className="skill-card card reveal reveal-delay-2"><span className="skill-icon"><FaJava /></span><span className="skill-name">Java </span><span className="skill-cat">Programming</span></div>
          <div className="skill-card card reveal reveal-delay-3"><span className="skill-icon"><FaJsSquare /></span><span className="skill-name">JavaScript</span></div>
          <div className="skill-card card reveal"><span className="skill-icon"><FaGlobe /></span><span className="skill-name">HTML</span></div>
          <div className="skill-card card reveal reveal-delay-1"><span className="skill-icon"><SiCplusplus /></span><span className="skill-name">C </span><span className="skill-cat">Programming</span></div>
          <div className="skill-card card reveal reveal-delay-2"><span className="skill-icon"><FaChartBar /></span><span className="skill-name">Feature </span><span className="skill-cat">Engineering</span></div>
        </div>

        <div style={{textAlign: 'center', marginTop: '2.5rem'}}>
          <Link to="/skills" className="btn">VIEW ALL SKILLS</Link>
        </div>
      </section>
    </div>
  );
}