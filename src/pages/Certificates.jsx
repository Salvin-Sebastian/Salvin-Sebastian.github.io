import SEO from '../components/SEO';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import portfolioData from '../data/portfolio_data.json';

export default function Certificates() {
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
      <SEO title="Salvin Sebastian | Certificates" description="View cybersecurity and programming certifications earned by Salvin Sebastian." />
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">HOME</Link> <span>/</span> CERTIFICATES</div>
        <h1 className="page-hero-title">My <span className="accent">Certifications</span></h1>
        <p className="page-hero-sub">// VALIDATING SKILLS AND KNOWLEDGE </p>
      </div>

      <section>
        <div className="certs-grid">
          {portfolioData.certificates.map((cert, index) => (
            <div className="cert-card card reveal" key={index}>
              <div className="cert-image">
                {cert.image ? <img src={cert.image} alt={cert.title} /> : <span>📄</span>}
              </div>
              <div className="cert-body">
                <div className="cert-org">{cert.organization}</div>
                <div className="cert-title">{cert.title}</div>
                <div className="cert-date">Issued: {cert.date}</div>
                <div className="cert-desc">{cert.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

