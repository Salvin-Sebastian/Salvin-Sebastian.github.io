import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaGraduationCap, FaHeart, FaCoffee } from 'react-icons/fa';
export default function Footer() {
  return (
    <footer>
      <div className="footer-social">
        <a href="https://github.com/salvin-sebastian" target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub /></a>
        <a href="https://linkedin.com/in/salvin-sebastian" target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin /></a>
        <a href="https://instagram.com/sa_lv_in_308" target="_blank" rel="noopener noreferrer" title="Instagram"><FaInstagram /></a>
        <a href="https://wa.me/918590796458" target="_blank" rel="noopener noreferrer" title="WhatsApp"><FaWhatsapp /></a>
        <a href="https://app.mulearn.org/profile/salvinsebastian@mulearn" target="_blank" rel="noopener noreferrer" title="MuLearn"><FaGraduationCap /></a>
      </div>
      <p className="footer-text">© {new Date().getFullYear()} <span className="accent">SALVIN SEBASTIAN</span> — All Rights Reserved</p>
      <p className="footer-text" style={{ marginTop: '0.4rem' }}>Built with <span className="accent"><FaHeart /></span> & <span className="accent"><FaCoffee style={{marginLeft:'3px', marginRight:'3px'}}/> lots of coffee</span></p>
    </footer>
  );
}