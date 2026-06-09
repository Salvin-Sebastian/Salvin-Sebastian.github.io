// scripts/fetch-projects.js
// This script automatically fetches public repositories from GitHub
// and merges them into the portfolio_data.json file.

import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replace with your GitHub Username
const GITHUB_USERNAME = 'Salvin-Sebastian';

const options = {
  hostname: 'api.github.com',
  path: `/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
  method: 'GET',
  headers: {
    'User-Agent': 'Node.js Script for Portfolio Sync'
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
        const repos = JSON.parse(data);
        console.log(`Fetched ${repos.length} repositories from GitHub.`);

        const targetPath = path.join(__dirname, '../src/data/portfolio_data.json');
        
        let existingData = { projects: [], certificates: [] };
        if (fs.existsSync(targetPath)) {
          existingData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
        }

        const incomingProjects = repos
          .filter(repo => !repo.fork) // Optionally ignore forks
          .map(repo => ({
            title: repo.name.replace(/-/g, ' '),
            description: repo.description || 'No description provided.',
            tags: repo.language ? [repo.language] : [],
            image: "/assets/images/projects/placeholder.png",
            github_link: repo.html_url,
            demo_link: repo.homepage || ""
          }));

        let mergedProjects = [...existingData.projects];
        let newProjectsCount = 0;
        
        incomingProjects.forEach(incomingProj => {
          const existsIndex = mergedProjects.findIndex(p => p.title.toLowerCase() === incomingProj.title.toLowerCase());
          if (existsIndex === -1) {
            mergedProjects.push(incomingProj);
            newProjectsCount++;
          } else {
            // Keep existing image and tags, but update links and description
            mergedProjects[existsIndex].description = incomingProj.description;
            mergedProjects[existsIndex].github_link = incomingProj.github_link;
            if (incomingProj.demo_link) {
              mergedProjects[existsIndex].demo_link = incomingProj.demo_link;
            }
          }
        });

        const finalData = {
          projects: mergedProjects,
          certificates: existingData.certificates || [],
          last_sync: new Date().toISOString()
        };

        fs.writeFileSync(targetPath, JSON.stringify(finalData, null, 2));
        console.log(`Successfully updated src/data/portfolio_data.json.`);
        console.log(`Added ${newProjectsCount} new projects from GitHub.`);
      } catch (err) {
        console.error('Error parsing GitHub API response:', err);
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
