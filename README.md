# Portfolio
A responsive personal portfolio website built to showcase my projects, technical skills, and development journey. It features sections like About, Skills, Projects, and Contact with a clean and modern user interface. Developed using HTML, CSS, and JavaScript with a focus on responsive design and smooth user experience.

# 🔐 Portfolio — Edit Guide

A dark-themed cybersecurity portfolio website. Here's everything you need to know to make it yours.

---

## 📁 File Structure

```
portfolio-website/
├── index.html          ← Home page
├── about.html          ← About Me
├── skills.html         ← Skills showcase
├── certificates.html   ← Your certificates
├── projects.html       ← Your projects
├── gallery.html        ← Photo gallery
├── contact.html        ← Contact page
│
├── css/
│   └── style.css       ← All styles (colors, layout, animations)
│
├── js/
│   ├── loading.js      ← Matrix rain + loading screen
│   ├── animations.js   ← Scroll reveals, typing, cursor
│   └── script.js       ← Particles, misc utilities
│
├── images/
│   ├── profile/        ← Put your profile photo here
│   ├── certificates/   ← Put certificate images here
│   ├── projects/       ← Put project screenshots here
│   └── gallery/        ← Put gallery photos here
│
└── assets/
    ├── icons/          ← favicon.svg
    └── resume.pdf      ← PUT YOUR RESUME HERE ← important!
```

---

## ✏️ Quick Edit Checklist

### 1. Your Name
Search all HTML files for `[YOUR NAME]` and replace with your actual name.

### 2. Profile Photo
- Copy your photo to `images/profile/photo.jpg`
- In `about.html`, find the `placeholder-icon` div and replace it with:
  ```html
  <img src="images/profile/photo.jpg" alt="Your Name" />
  ```

### 3. Resume / CV
- Copy your PDF resume to `assets/resume.pdf`
- The download button on the home page will automatically work.

### 4. Social Links
Search all HTML files for these placeholders and replace with your actual URLs:
- `https://github.com/yourusername`
- `https://linkedin.com/in/yourprofile`
- `https://instagram.com/yourhandle`
- `https://wa.me/910000000000` → Replace `910000000000` with your WhatsApp number (country code + number, no spaces or +)
- `https://mulearn.org/profile/yourusername`
- `mailto:your@email.com`

### 5. About Me Text
Open `about.html` and edit the paragraphs in the `about-info` section.

### 6. Skills
Open `skills.html`. Each `.skill-card` has an emoji, name, and category. Add/remove cards as needed.

### 7. Certificates
Open `certificates.html`:
- Add certificate images to `images/certificates/`
- Replace the emoji placeholder in each `.cert-image` div with: `<img src="images/certificates/cert.jpg" alt="..." />`
- Update the title, organization, description, and date.

### 8. Projects
Open `projects.html`:
- Add screenshots to `images/projects/`
- Replace emoji placeholders with `<img>` tags
- Update title, description, tags, and GitHub links

### 9. Gallery Photos
Open `gallery.html`:
- Add photos to `images/gallery/`
- Replace each placeholder div with `<img src="images/gallery/yourphoto.jpg" alt="..." />`
- Set the correct `data-src` on each `.gallery-item`
- Set `data-category` to: `achievements`, `events`, `workshops`, or `learning`

### 10. Progress Bars (About page)
In `about.html`, each `.progress-bar-fill` has a `data-width` attribute (e.g., `"85%"`).
Change these percentages to reflect your actual skill level.

### 11. Stats Counter (Home page)
In `index.html`, each `.stat-number` has a `data-target` attribute.
Change the numbers to reflect your actual project count, certificate count, etc.

---

## 🎨 Customizing Colors

Open `css/style.css` and find the `:root` block at the top.

```css
:root {
  --neon-green: #00ff65;   ← Primary accent color
  --neon-cyan:  #00e5ff;   ← Secondary accent color
  --neon-blue:  #0080ff;   ← Tertiary color
  --bg-primary: #020c06;   ← Main background
  --bg-secondary: #061510; ← Slightly lighter background
}
```

Change `--neon-green` and `--neon-cyan` to any colors you like!

---

## 📧 Contact Form — Making It Actually Send Emails

By default the form shows a success message but doesn't actually send anything.

**Option A — Formspree (easiest, free):**
1. Go to https://formspree.io and create an account
2. Create a new form and get your form ID
3. In `contact.html`, find the `<form>` tag and change it to:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
   ```
4. Remove the `id="contact-form"` attribute so the custom handler doesn't interfere

**Option B — EmailJS (free, no backend):**
Visit https://emailjs.com and follow their integration guide.

---

## 🌐 Hosting Your Portfolio

You can host this for FREE on:
- **GitHub Pages** — Push to a GitHub repo, enable Pages in Settings
- **Netlify** — Drag and drop the folder at netlify.com/drop
- **Vercel** — Connect your GitHub repo at vercel.com

---

## 🚀 Tips

- Always test on mobile — use browser DevTools (F12) and toggle device view
- Keep your resume PDF under 2MB
- Use WebP format for images to keep the site fast
- The loading screen plays once per page load — this is intentional

---

Made with 🔐 and a lot of `sudo`
