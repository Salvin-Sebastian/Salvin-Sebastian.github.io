const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const srcDipDir = path.join(rootDir, 'DIP');
const destRojiDir = path.join(rootDir, 'public', 'roji');

if (!fs.existsSync(srcDipDir)) {
  console.error('Source DIP directory not found at:', srcDipDir);
  process.exit(1);
}

if (!fs.existsSync(destRojiDir)) {
  fs.mkdirSync(destRojiDir, { recursive: true });
}

console.log('Syncing files from DIP/ to public/roji/...');
const files = fs.readdirSync(srcDipDir);

// Ensure no stale notebook exists in public/roji
const staleNb = path.join(destRojiDir, 'DIP_Practical_Notebook.ipynb');
if (fs.existsSync(staleNb)) {
  fs.unlinkSync(staleNb);
}

let copiedCount = 0;
for (const file of files) {
  if (file.endsWith('.ipynb')) continue;
  const srcFile = path.join(srcDipDir, file);
  const destFile = path.join(destRojiDir, file);
  const stat = fs.statSync(srcFile);

  if (stat.isFile()) {
    fs.copyFileSync(srcFile, destFile);
    copiedCount++;
  }
}
console.log(`Copied ${copiedCount} files to public/roji/`);

// Create ZIP bundle of all files
try {
  const zipPath = path.join(destRojiDir, 'dip_practical_programs.zip');
  console.log('Creating ZIP archive of DIP folder...');
  if (process.platform === 'win32') {
    // Windows PowerShell Compress-Archive
    execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${srcDipDir}\\*' -DestinationPath '${zipPath}' -Force"`, { stdio: 'inherit' });
  } else {
    // Unix zip
    execSync(`cd "${srcDipDir}" && zip -r "${zipPath}" ./*`, { stdio: 'inherit' });
  }
  console.log('ZIP archive created successfully at public/roji/dip_practical_programs.zip');
} catch (err) {
  console.warn('Could not create ZIP archive via CLI command, skipping ZIP creation:', err.message);
}

// Generate the interactive folder index HTML
console.log('Generating public/roji/index.html directory viewer...');
require('./generate-roji-index.cjs');
