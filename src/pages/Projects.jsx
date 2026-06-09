import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import portfolioData from '../data/portfolio_data.json';

export default function Projects() {
  useEffect(() => {
    // Simple reveal animation trigger
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const elementVisible = 150;
      reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('revealed');
        }
      });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">HOME</Link> <span>/</span> PROJECTS</div>
        <h1 className="page-hero-title">My <span className="accent">Projects</span></h1>
        <p className="page-hero-sub">// THINGS I BUILT AND BROKE </p>
      </div>

      <section>
        <div className="projects-grid">
          {portfolioData.projects.map((project, index) => (
            <div className="project-card card reveal" key={index}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-body">
                <div className="project-title">{project.title}</div>
                <div className="project-desc">{project.description}</div>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span className="tag" key={i}>{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github_link && (
                    <a href={project.github_link} className="btn btn-sm" target="_blank" rel="noopener noreferrer">⌨️ GitHub</a>
                  )}
                  {project.demo_link && (
                    <a href={project.demo_link} className="btn btn-sm" target="_blank" rel="noopener noreferrer">🔗 Demo</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
