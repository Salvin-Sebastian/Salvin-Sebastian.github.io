import SEO from '../components/SEO';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShieldAlt, FaPython, FaJava, FaGlobe, FaJsSquare, FaDatabase,
  FaNetworkWired, FaSitemap, FaLock, FaServer, FaSearch, FaWifi,
  FaKey, FaFlag, FaBox, FaGraduationCap, FaBook 
} from 'react-icons/fa';
import { SiCplusplus } from 'react-icons/si';

export default function Skills() {
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
      <SEO title="Salvin Sebastian | Skills" description="Discover the technical skills, programming languages, and security tools mastered by Salvin Sebastian." />
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">HOME</Link> <span>/</span> SKILLS</div>
        <h1 className="page-hero-title">My <span className="accent">Arsenal</span></h1>
        <p className="page-hero-sub">// TOOLS AND KNOWLEDGE IN MY TOOLKIT</p>
      </div>

      <section>
        <div className="skills-category reveal">
          <h3>CYBERSECURITY</h3>
          <div className="skills-grid">
            <div className="skill-card card"><span className="skill-icon"><FaShieldAlt /></span><span className="skill-name">Cyber Security</span><span className="skill-cat">Core Skill</span></div>
          </div>
        </div>

        <div className="skills-category reveal">
          <h3>PROGRAMMING LANGUAGES</h3>
          <div className="skills-grid">
            <div className="skill-card card"><span className="skill-icon"><FaPython /></span><span className="skill-name">Python </span><span className="skill-cat">Programming</span></div>
            <div className="skill-card card"><span className="skill-icon"><FaJava /></span><span className="skill-name">Java </span><span className="skill-cat">Programming</span></div>
            <div className="skill-card card"><span className="skill-icon"><FaGlobe /></span><span className="skill-name">HTML / CSS </span><span className="skill-cat">Web</span></div>
            <div className="skill-card card"><span className="skill-icon"><FaJsSquare /></span><span className="skill-name">JavaScript </span><span className="skill-cat">Web</span></div>
            <div className="skill-card card"><span className="skill-icon"><SiCplusplus /></span><span className="skill-name">C & C++ </span><span className="skill-cat">Programming Basics</span></div>
            <div className="skill-card card"><span className="skill-icon"><FaDatabase /></span><span className="skill-name">SQL </span><span className="skill-cat">Database Basics</span></div>
          </div>
        </div>

        <div className="skills-category reveal">
          <h3>NETWORKING</h3>
          <div className="skills-grid">
            <div className="skill-card card"><span className="skill-icon"><FaNetworkWired /></span><span className="skill-name">TCP/IP </span><span className="skill-cat">Protocol</span></div>
            <div className="skill-card card"><span className="skill-icon"><FaSitemap /></span><span className="skill-name">Subnetting </span><span className="skill-cat">IP Addressing</span></div>
            <div className="skill-card card"><span className="skill-icon"><FaLock /></span><span className="skill-name">VPN / SSL/TLS </span><span className="skill-cat">Encryption</span></div>
            <div className="skill-card card"><span className="skill-icon"><FaServer /></span><span className="skill-name">DNS / DHCP </span><span className="skill-cat">Services</span></div>
          </div>
        </div>

        <div className="skills-category reveal">
          <h3>SECURITY TOOLS</h3>
          <div className="skills-grid">
            <div className="skill-card card"><span className="skill-icon"><FaSearch /></span><span className="skill-name">Nmap </span><span className="skill-cat">Network Scanner</span></div>
            <div className="skill-card card"><span className="skill-icon"><FaWifi /></span><span className="skill-name">Aircrack-ng </span><span className="skill-cat">Wi-Fi Security</span></div>
            <div className="skill-card card"><span className="skill-icon"><FaKey /></span><span className="skill-name">Hashcat & John & Hydra </span><span className="skill-cat">Password Tools</span></div>
          </div>
        </div>

        <div className="skills-category reveal">
          <h3>LEARNING PLATFORMS</h3>
          <div className="skills-grid">
            <div className="skill-card card"><span className="skill-icon"><FaFlag /></span><span className="skill-name">TryHackMe </span><span className="skill-cat">CTF Platform</span></div>
            <div className="skill-card card"><span className="skill-icon"><FaBox /></span><span className="skill-name">HackTheBox </span><span className="skill-cat">CTF Platform</span></div>
            <div className="skill-card card"><span className="skill-icon"><FaGraduationCap /></span><span className="skill-name">MuLearn & Discord </span><span className="skill-cat">Community</span></div>
            <div className="skill-card card"><span className="skill-icon"><FaBook /></span><span className="skill-name">Coursera </span><span className="skill-cat">Online Courses</span></div>
          </div>
        </div>
      </section>
    </div>
  );
}