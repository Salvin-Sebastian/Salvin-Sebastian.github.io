import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundEffects from './components/BackgroundEffects';
import LoadingScreen from './components/LoadingScreen';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <LoadingScreen />
      <BackgroundEffects />
      
      {/* ░░ CURSOR ░░ */}
      <div className="cursor"></div>
      <div className="cursor-follower"></div>
      <div id="scroll-progress"></div>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />

      {/* Floating WhatsApp */}
      <a href="https://wa.me/918590796458" className="whatsapp-float" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">💬</a>
    </Router>
  );
}

export default App;
