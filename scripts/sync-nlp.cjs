const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const srcNlpDir = path.join(rootDir, 'NLP');
const destNlpDir = path.join(rootDir, 'public', 'nlp');

if (!fs.existsSync(srcNlpDir)) {
  console.error('Source NLP directory not found at:', srcNlpDir);
  process.exit(1);
}

if (!fs.existsSync(destNlpDir)) {
  fs.mkdirSync(destNlpDir, { recursive: true });
}

console.log('Syncing files from NLP/ to public/nlp/...');
const files = fs.readdirSync(srcNlpDir);

let copiedCount = 0;
for (const file of files) {
  const srcFile = path.join(srcNlpDir, file);
  const destFile = path.join(destNlpDir, file);
  const stat = fs.statSync(srcFile);

  if (stat.isFile()) {
    fs.copyFileSync(srcFile, destFile);
    copiedCount++;
  }
}
console.log(`Copied ${copiedCount} files to public/nlp/`);

// Create ZIP bundle of all files
try {
  const zipPath = path.join(destNlpDir, 'nlp_practical_programs.zip');
  console.log('Creating ZIP archive of NLP folder...');
  if (process.platform === 'win32') {
    // Windows PowerShell Compress-Archive
    execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${srcNlpDir}\\*' -DestinationPath '${zipPath}' -Force"`, { stdio: 'inherit' });
  } else {
    // Unix zip
    execSync(`cd "${srcNlpDir}" && zip -r "${zipPath}" ./*`, { stdio: 'inherit' });
  }
  console.log('ZIP archive created successfully at public/nlp/nlp_practical_programs.zip');
} catch (err) {
  console.warn('Could not create ZIP archive via CLI command, skipping ZIP creation:', err.message);
}

// Generate the interactive folder index HTML
console.log('Generating public/nlp/index.html directory viewer...');
require('./generate-nlp-index.cjs');
