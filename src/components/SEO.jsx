import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description }) {
  const defaultTitle = "Salvin Sebastian | Cybersecurity Student & Ethical Hacker";
  const defaultDesc = "Portfolio of Salvin Sebastian, a Cybersecurity student & ethical hacking enthusiast. Explore my skills, projects, and certifications.";

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="twitter:title" content={title || defaultTitle} />
      <meta property="twitter:description" content={description || defaultDesc} />
    </Helmet>
  );
}
