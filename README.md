# Salman Ahmed — Portfolio

React + Vite + Tailwind + Framer Motion.

## Chalana

```bash
npm install      # sirf pehli dafa
npm run dev      # http://localhost:5173 par khulega
```

## Content edit karna

**Saara text, projects, jobs, skills sirf ek file mein hain: `src/data.js`**
Us file ke shuru mein guide likhi hai. Save karte hi browser update ho jata hai.

| Kya karna hai | Kahan |
|---|---|
| Naam, email, LinkedIn/GitHub links | `data.js` → `profile` |
| About ki bari line, bio, info boxes | `data.js` → `profile.intro` / `bio` / `facts` |
| CV download button | PDF ko `public/Salman-Ahmed-CV.pdf` naam se rakhein |
| Naya project | `projects` mein ek block copy-paste karein |
| Project screenshots | `public/` mein images → `images: ['/a.png', '/b.png']` |
| Nayi job | `experience` ke shuru mein naya block |
| "Open to work" band karna | `profile.available: false` |
| Colors badalne | `src/index.css` → `--accent` / `--accent2` (RGB numbers) |

## Live site

**https://salmanmalikme11.github.io**

Site GitHub Pages par hai. `main` branch par har push ke baad GitHub Actions
(`.github/workflows/deploy.yml`) khud build karke site update kar deta hai, 1-2 minute lagte hain.

```bash
git add .
git commit -m "Update portfolio"
git push
```
