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
        <p className="page-hero-sub">// WHO AM I? LET ME DECRYPT THAT FOR YOU</p>
      </div>

      <section>
        <div className="about-grid">
          <div className="profile-photo-wrap reveal">
            <div className="profile-photo-frame">
              <div className="placeholder-icon"><img src="/assets/images/profile/photo.webp" alt="Salvin Sebastian" /></div>
              <div className="photo-corner photo-corner-tl"></div>
              <div className="photo-corner photo-corner-tr"></div>
              <div className="photo-corner photo-corner-bl"></div>
              <div className="photo-corner photo-corner-br"></div>
            </div>
            <p className="about-label">
              SALVIN SEBASTIAN // STUDENT
            </p>
          </div>

          <div className="about-info">
            <h3 className="reveal">
              Hello, I'm a <span style={{color: 'var(--neon-green)'}}>Cybersecurity Enthusiast</span>
            </h3>

            <p className="reveal reveal-delay-1">
              I am Salvin Sebastian, a passionate and motivated technology enthusiast with a strong interest in software development and modern computing technologies. Currently pursuing my studies in computer applications, I am continuously building my knowledge in programming, problem-solving, and developing practical digital solutions. My interest in technology comes from the excitement of turning ideas into real applications that can solve problems and improve user experiences.
            </p>
            <p className="reveal reveal-delay-2">
              Through my academic learning and personal projects, I enjoy exploring different programming concepts and experimenting with new tools and technologies. I focus on writing clean, efficient, and maintainable code while building applications that are functional, reliable, and user-friendly. Each project I work on helps me strengthen my technical skills and deepen my understanding of how software can be designed and implemented effectively.
            </p>
            <p className="reveal reveal-delay-3">
              Beyond technical development, I believe in continuous learning, adaptability, and creativity in technology. I am always eager to expand my knowledge, collaborate with others, and take on new challenges that help me grow both personally and professionally. My goal is to develop innovative solutions, contribute to meaningful projects, and build a strong career in the field of technology.
            </p>

            <div className="info-grid reveal">
              <div className="info-item">
                <span className="label">NAME</span>
                <span className="value">SALVIN SEBASTIAN</span>
              </div>
              <div className="info-item">
                <span className="label">LOCATION</span>
                <span className="value">Alappuzha, Kerala, India</span>
              </div>
              <div className="info-item">
                <span className="label">COLLEGE</span>
                <span className="value">Kristu Jyoti College of Management and Technology, Kurisummoodu P.O. Chethipuzha, Changanacherry 686104</span>
              </div>
              <div className="info-item">
                <span className="label">DEGREE</span>
                <span className="value">Bachelor's of Computer Application</span>
              </div>
              <div className="info-item">
                <span className="label">YEAR</span>
                <span className="value">3rd Year, 2024-2028</span>
              </div>
              <div className="info-item">
                <span className="label">EMAIL</span>
                <span className="value">salvinsebastian308@gmail.com</span>
              </div>
            </div>
            
            <div style={{marginTop: '2rem'}}>
              <a href="/assets/images/profile/profile.pdf" className="btn btn-solid" download>DOWNLOAD RESUME</a>
            </div>
          </div>
        </div>
      </section>

      <section style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem 2rem 5rem'}}>
        <div className="section-header reveal">
          <span className="section-tag">// ACADEMIC JOURNEY</span>
          <h2 className="section-title">My <span className="accent">Education</span></h2>
          <div className="section-divider"></div>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '800px', margin: '0 auto'}}>
          <div className="card reveal" style={{padding: '1.5rem 1.75rem', position: 'relative'}}>
            <div style={{position: 'absolute', left: '-1px', top: '0', bottom: '0', width: '3px', background: 'linear-gradient(180deg, var(--neon-green), transparent)'}}></div>
            <div style={{fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-green)', letterSpacing: '0.2em', marginBottom: '0.4rem'}}>2024 – PRESENT</div>
            <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.3rem'}}>Bachelor's of Computer Application</h3>
            <p style={{color: 'var(--neon-cyan)', fontSize: '0.9rem', marginBottom: '0.5rem'}}>Kristu Jyoti College of Management and Technology, Kurisummoodu P.O. Chethipuzha, Changanacherry 686104</p>
            <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Specializing in cybersecurity modules, networking fundamentals, and software development. Active member of the cybersecurity club.</p>
          </div>

          <div className="card reveal reveal-delay-1" style={{padding: '1.5rem 1.75rem', position: 'relative'}}>
            <div style={{position: 'absolute', left: '-1px', top: '0', bottom: '0', width: '3px', background: 'linear-gradient(180deg, var(--neon-cyan), transparent)'}}></div>
            <div style={{fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-green)', letterSpacing: '0.2em', marginBottom: '0.4rem'}}>2022 – 2024</div>
            <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.3rem'}}>Higher Secondary Education (12th Grade)</h3>
            <p style={{color: 'var(--neon-cyan)', fontSize: '0.9rem', marginBottom: '0.5rem'}}>St. Mary's Higher Secondary School Champakulam</p>
            <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Computer Science Stream. Successfully completed Higher Secondary education (Class 12) under Kerala Board of Higher Secondary Education (DHSE), specializing in Computer Science. Gained advanced knowledge in key subjects, developed analytical and problem-solving skills, and prepared for higher education and professional studies.</p>
          </div>

          <div className="card reveal reveal-delay-1" style={{padding: '1.5rem 1.75rem', position: 'relative'}}>
            <div style={{position: 'absolute', left: '-1px', top: '0', bottom: '0', width: '3px', background: 'linear-gradient(180deg, var(--neon-cyan), transparent)'}}></div>
            <div style={{fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-green)', letterSpacing: '0.2em', marginBottom: '0.4rem'}}>2021 – 2022</div>
            <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.3rem'}}>High School (10th Grade)</h3>
            <p style={{color: 'var(--neon-cyan)', fontSize: '0.9rem', marginBottom: '0.5rem'}}>St. Mary's Higher Secondary School Champakulam</p>
            <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>General Education. Successfully completed secondary education (Class 10) under Kerala Board of Public Examinations, covering foundational subjects in Science, Mathematics, Social Studies, and Languages. This certificate marks the completion of basic formal education and prepares for higher secondary studies.</p>
          </div>
        </div>
      </section>
    </div>
  );
}