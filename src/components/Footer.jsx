export default function Footer() {
  return (
    <footer>
      <div className="footer-social">
        <a href="https://github.com/salvin-sebastian" target="_blank" rel="noopener noreferrer" title="GitHub">⌨️</a>
        <a href="https://linkedin.com/in/salvin-sebastian" target="_blank" rel="noopener noreferrer" title="LinkedIn">💼</a>
        <a href="https://instagram.com/sa_lv_in_308" target="_blank" rel="noopener noreferrer" title="Instagram">📸</a>
        <a href="https://wa.me/918590796458" target="_blank" rel="noopener noreferrer" title="WhatsApp">💬</a>
        <a href="https://app.mulearn.org/profile/salvinsebastian@mulearn" target="_blank" rel="noopener noreferrer" title="MuLearn">🎓</a>
      </div>
      <p className="footer-text">© {new Date().getFullYear()} <span className="accent">SALVIN SEBASTIAN</span> — All Rights Reserved</p>
      <p className="footer-text" style={{ marginTop: '0.4rem' }}>Built with <span className="accent">♥</span> & <span className="accent">lots of coffee</span></p>
    </footer>
  );
}