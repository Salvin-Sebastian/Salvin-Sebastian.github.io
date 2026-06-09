# Portfolio

A responsive, modern personal portfolio website built to showcase projects, technical skills, and development journey. Originally built with vanilla HTML/CSS/JS, it has now been modernized into a **React Single Page Application (SPA)** powered by **Vite**. 

It features automated synchronization with LinkedIn data, pulling the latest projects and certificates directly into the website without manual edits.

# 🔐 Portfolio — Setup & Edit Guide

A dark-themed cybersecurity portfolio website. Here's everything you need to know to run it, customize it, and set up the automated LinkedIn data extraction.

---

## 🛠️ Tech Stack
- **Framework:** React + Vite
- **Routing:** React Router DOM
- **Styling:** Vanilla CSS (Global styles with CSS Variables)
- **Automation:** GitHub Actions + Node.js (Proxycurl API)

---

## 🚀 Getting Started

To run this project locally on your machine:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 File Structure

```
portfolio-website/
├── index.html                  ← Vite Entry point
├── src/
│   ├── App.jsx                 ← Main Router & Layout
│   ├── main.jsx                ← React Entry
│   ├── components/             ← Reusable React components (Navbar, Footer, BackgroundEffects)
│   ├── pages/                  ← Page components (Home, About, Projects, etc.)
│   ├── styles/
│   │   └── style.css           ← Global styles (colors, layout, animations)
│   └── data/
│       └── linkedin_data.json  ← Automatically generated data file (Projects/Certificates)
│
├── public/
│   └── assets/                 ← Static assets (icons, images, PDF resume)
│
├── scripts/
│   └── fetch-linkedin.js       ← Node.js script to fetch LinkedIn data
│
└── .github/
    └── workflows/
        └── linkedin-sync.yml   ← GitHub Action to automate data fetching
```

---

## 🤖 Automated LinkedIn Data Extraction

This portfolio automatically fetches your latest projects and certifications from LinkedIn using a GitHub Action and a third-party API (Proxycurl).

### How to set it up:

1. **Get an API Key:** Sign up for an account at [Proxycurl](https://nubela.co/proxycurl/) (or alternative) and get your API key.
2. **Add GitHub Secret:** 
   - Go to your repository **Settings** -> **Secrets and variables** -> **Actions**
   - Click **New repository secret**
   - Name: `PROXYCURL_API_KEY`
   - Value: `[Your actual API key]`
3. **Allow Actions to Commit:**
   - Go to **Settings** -> **Actions** -> **General**
   - Under **Workflow permissions**, select **Read and write permissions**.

**How it works:**
The GitHub action `.github/workflows/linkedin-sync.yml` runs every week (Sunday at midnight). It executes the `scripts/fetch-linkedin.js` file, which queries the API, formats your LinkedIn projects and certificates, and updates `src/data/linkedin_data.json`. The React components `<Projects />` and `<Certificates />` read directly from this file.

---

## ✏️ Quick Edit Checklist

### 1. Profile Photo
- Copy your photo to `public/assets/images/profile/photo.png`

### 2. Resume / CV
- Copy your PDF resume to `public/assets/images/profile/profile.pdf`
- The download button on the Home and About pages will automatically link to it.

### 3. Social Links
Open `src/components/Footer.jsx` and `src/App.jsx` (for the WhatsApp floating button) and replace the URLs with your actual profiles:
- GitHub
- LinkedIn
- Instagram
- WhatsApp
- MuLearn

### 4. About Me Text
Open `src/pages/About.jsx` and edit the paragraphs inside the `<div className="about-info">`.

### 5. Skills
Open `src/pages/Home.jsx` and `src/pages/Skills.jsx`. Add or remove `<div className="skill-card">` components as needed.

### 6. Projects & Certificates
Since these are now automated, you generally don't need to manually edit the code for these. However, if you want to manually add an item or an image that isn't on LinkedIn:
- Open `src/data/linkedin_data.json` and manually add the object.
- *Note: The automated script is designed to preserve manual additions if the titles match.*

### 7. Stats Counter (Home page)
In `src/pages/Home.jsx`, edit the values inside the `<div className="stat-number">` components.

---

## 🎨 Customizing Colors

Open `src/styles/style.css` and find the `:root` block at the top.

```css
:root {
  --neon-green: #00ff65;   /* Primary accent color */
  --neon-cyan:  #00e5ff;   /* Secondary accent color */
  --neon-blue:  #0080ff;   /* Tertiary color */
  --bg-primary: #020c06;   /* Main background */
  --bg-secondary: #061510; /* Slightly lighter background */
}
```

Change `--neon-green` and `--neon-cyan` to any colors you prefer to instantly alter the theme.

---

## 🌐 Hosting Your Portfolio

Since this is now a React app powered by Vite, you can host it easily:

- **Vercel** — Connect your GitHub repo at vercel.com. It will automatically detect Vite and configure the build command (`npm run build`) and output directory (`dist`).
- **Netlify** — Connect your repo at netlify.com. Same as above, the defaults will work out of the box.
- **GitHub Pages** — You can deploy to GitHub pages using the `gh-pages` npm package or a GitHub Action workflow.

---

Made with 🔐 and a lot of `sudo`
