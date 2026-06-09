// scripts/fetch-linkedin.js
// This script runs via GitHub Actions to fetch LinkedIn profile data
// using a Free RapidAPI endpoint (e.g. "Fresh LinkedIn Profile Data").

import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const LINKEDIN_URL = process.env.LINKEDIN_PROFILE_URL || 'https://www.linkedin.com/in/salvin-sebastian';

if (!RAPIDAPI_KEY) {
  console.log('No RAPIDAPI_KEY found. Skipping LinkedIn sync.');
  process.exit(0);
}

// Using a popular generic LinkedIn API endpoint on RapidAPI
const options = {
  hostname: 'fresh-linkedin-profile-data.p.rapidapi.com',
  path: `/get-linkedin-profile?linkedin_url=${encodeURIComponent(LINKEDIN_URL)}&include_skills=true`,
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'fresh-linkedin-profile-data.p.rapidapi.com'
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      try {
        const payload = JSON.parse(data);
        const profile = payload.data || payload;
        
        console.log(`Fetched RapidAPI data for: ${profile.full_name || profile.first_name}`);

        const targetPath = path.join(__dirname, '../src/data/linkedin_data.json');
        
        // Read existing file to check for duplicates
        let existingData = { projects: [], certificates: [] };
        if (fs.existsSync(targetPath)) {
          existingData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
        }

        // Map the incoming RapidAPI response structure
        const incomingProjects = (profile.projects || profile.accomplishment_projects || []).map(p => ({
          title: p.title || p.name || 'Untitled Project',
          description: p.description || '',
          tags: [],
          image: "/assets/images/projects/placeholder.png",
          github_link: p.url || "",
          demo_link: ""
        }));

        const incomingCertificates = (profile.certifications || profile.licenses_and_certifications || []).map(c => ({
          title: c.name || c.title || 'Certificate',
          organization: c.authority || c.issuing_authority || 'Issuing Authority',
          date: (c.starts_at || c.issue_date) ? ((c.starts_at?.year || c.issue_date?.year) + '-' + String(c.starts_at?.month || c.issue_date?.month).padStart(2, '0')) : 'Present',
          description: "",
          image: "/assets/images/certificates/placeholder.png"
        }));

        // Deduplication logic: If a project/cert with the exact same title exists, KEEP the existing one.
        // This preserves any manual changes the user made (custom tags, custom image paths).

        let mergedProjects = [...existingData.projects];
        let newProjectsCount = 0;
        
        incomingProjects.forEach(incomingProj => {
          const exists = mergedProjects.find(p => p.title.toLowerCase() === incomingProj.title.toLowerCase());
          if (!exists) {
            mergedProjects.push(incomingProj);
            newProjectsCount++;
          }
        });

        let mergedCertificates = [...existingData.certificates];
        let newCertsCount = 0;

        incomingCertificates.forEach(incomingCert => {
          const exists = mergedCertificates.find(c => c.title.toLowerCase() === incomingCert.title.toLowerCase());
          if (!exists) {
            mergedCertificates.push(incomingCert);
            newCertsCount++;
          }
        });

        const finalData = {
          projects: mergedProjects,
          certificates: mergedCertificates,
          last_sync: new Date().toISOString(),
          linkedin_name: profile.full_name || `${profile.first_name} ${profile.last_name}`,
          linkedin_photo: profile.profile_pic_url || profile.profile_picture
        };

        fs.writeFileSync(targetPath, JSON.stringify(finalData, null, 2));
        console.log(`Successfully updated src/data/linkedin_data.json.`);
        console.log(`Added ${newProjectsCount} new projects and ${newCertsCount} new certificates.`);
      } catch (err) {
        console.error('Error parsing LinkedIn API response:', err);
        process.exit(1);
      }
    } else {
      console.error(`API Request failed with status ${res.statusCode}: ${data}`);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
  process.exit(1);
});

req.end();
