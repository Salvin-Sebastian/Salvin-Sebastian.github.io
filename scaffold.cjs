const fs = require('fs');
const pages = ['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Gallery', 'Contact'];
pages.forEach(p => fs.writeFileSync(`src/pages/${p}.jsx`, `export default function ${p}() {\n  return (\n    <div className='page-wrapper'>\n      <section><h1>${p}</h1></section>\n    </div>\n  );\n}`));

const comps = ['Navbar', 'Footer', 'BackgroundEffects', 'LoadingScreen'];
comps.forEach(c => fs.writeFileSync(`src/components/${c}.jsx`, `export default function ${c}() {\n  return null;\n}`));
