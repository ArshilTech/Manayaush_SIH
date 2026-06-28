<p align="center">
  <img src="favicon.svg" alt="Manayush Logo" width="120" />
</p>

<h1 align="center">🧠 Manayush</h1>

<p align="center">
  <strong>Digital Psychological Support for Students in Higher Education</strong>
</p>

<p align="center">
  <em>A stigma-free, multilingual mental health platform — designed for Indian campuses.</em>
</p>

<p align="center">
  <a href="#-features"><img src="https://img.shields.io/badge/Features-7-7c3aed?style=for-the-badge" alt="Features" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JS-36d7b7?style=for-the-badge" alt="Tech Stack" /></a>
  <a href="#-getting-started"><img src="https://img.shields.io/badge/Setup-2%20min-ef4444?style=for-the-badge" alt="Setup Time" /></a>
  <a href="https://github.com/ArshilTech/Manayaush_SIH"><img src="https://img.shields.io/badge/SIH-2025%20Internal-484666?style=for-the-badge" alt="Smart India Hackathon 2025" /></a>
</p>

---

## 📖 About

**Manayush** (मनायुष — *Mana* = Mind, *Ayush* = Life) is a digital mental health and psychological support system purpose-built for students in higher education institutions across India.

> *"You're not alone. Support is one click away."*

The platform brings together **AI-guided first-aid**, **confidential counsellor booking**, **peer support**, and **psychoeducational resources** — all within a single, accessible, and stigma-free interface. It supports **English and Hindi** out of the box and is designed to be easily extensible to other regional languages.

Built as a prototype for the **Smart India Hackathon 2025 (Internal Edition)**, Manayush addresses the critical gap in accessible mental health tools for the 40M+ students in Indian higher education.

---

## ✨ Features

| Module | Description |
|--------|-------------|
| 🧠 **AI First-Aid Chat** | Keyword-aware chatbot providing instant coping strategies for stress, anxiety, sleep issues, loneliness, and academic pressure. Includes safety detection for crisis-related keywords. |
| 📅 **Confidential Booking** | Schedule private online or phone sessions with campus counsellors. Supports topic selection (anxiety, stress, sleep, relationships, academics) and optional notes. |
| 🌐 **Multilingual Interface** | Full i18n support with **English** and **Hindi** translations. One-click language switching across all UI text via `data-i18n` attributes. |
| 🤝 **Peer Support Board** | Anonymous, moderated student community. Client-side content moderation flags harmful content and auto-triggers the crisis modal for safety. |
| 📊 **Admin Dashboard** | Anonymous analytics with Chart.js-powered visualizations — mood distribution (doughnut chart) and booking topic frequency (bar chart). |
| 🧭 **Crisis Help Modal** | Instant access to **Tele MANAS (14416)** and campus counsellor hotlines. Auto-activated when harmful content is detected. |
| 🧘 **Self-Care Toolkit** | Built-in wellness tools: 3-minute breathing timer, 5-4-3-2-1 grounding exercise, and a personal journal with local storage. |

---

## 🎯 Key Highlights

- **Zero Backend Required** — Runs entirely in the browser with `localStorage` for data persistence
- **Instant Mood Check-In** — Interactive emoji-based mood tracker with tailored coping tips
- **Privacy First** — No data leaves the device; all bookings, journal entries, and mood logs are stored locally
- **Quick Prompt Chips** — Pre-built conversation starters (Exams, Sleep, Lonely, Placements) for the AI chat
- **Responsive Design** — Optimized for desktop, tablet, and mobile viewports
- **Data Export** — One-click JSON export of all demo data for analysis

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Structure** | HTML5, Semantic Elements, `<dialog>` for modals |
| **Styling** | Vanilla CSS with CSS Custom Properties, Glassmorphism effects, Inter (Google Fonts) |
| **Logic** | Vanilla JavaScript (ES6+), no frameworks |
| **Charts** | [Chart.js 4.4.1](https://www.chartjs.org/) via CDN |
| **Storage** | Browser `localStorage` |
| **i18n** | Custom lightweight i18n system via `data-i18n` attributes |

---

## 🚀 Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, Safari)
- A local development server (optional but recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ArshilTech/Manayaush_SIH.git
   cd Manayaush_SIH
   ```

2. **Open in browser**

   Simply open `index.html` directly in your browser:

   ```bash
   # macOS
   open index.html

   # Windows
   start index.html

   # Linux
   xdg-open index.html
   ```

   **Or** use a local dev server for the best experience:

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js (npx)
   npx serve .

   # Using VS Code
   # Install "Live Server" extension → Right-click index.html → "Open with Live Server"
   ```

3. **Explore** — Navigate through Home, AI First-Aid, Book Session, Resources, Peer Support, and Admin Dashboard.

---

## 📁 Project Structure

```
Manayaush_SIH/
│
├── index.html          # Main application — all sections (SPA-style)
├── styles.css          # Complete stylesheet with CSS custom properties
├── app.js              # Application logic — router, i18n, chat, booking, admin
├── favicon.svg         # Heart-in-hands SVG logo
└── README.md           # You are here
```

---

## 🗺️ Application Sections

```
┌─────────────────────────────────────────────────────────┐
│  Header: Brand / Navigation / Language Toggle / Panic   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🏠 Home          → Hero + Quick Mood Check-In          │
│  🧠 AI First-Aid  → Chat + Self-Care Toolkit            │
│  📅 Book Session  → Counsellor Booking Form             │
│  📚 Resources     → Filterable Psychoeducational Cards   │
│  🤝 Peer Support  → Anonymous Moderated Posts            │
│  📊 Admin         → Stats + Charts (Mood & Topics)       │
│  ℹ️  About         → Project Info + Privacy Notice        │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Footer: © Year · Built for student well-being          │
└─────────────────────────────────────────────────────────┘
```

---

## 🌍 Internationalization (i18n)

Manayush includes a lightweight, custom i18n system. To add a new language:

1. Add a new language entry to the `i18n` object in [app.js](app.js):

   ```javascript
   const i18n = {
     en: { /* ... */ },
     hi: { /* ... */ },
     ta: {  // Tamil example
       tagline: "மாணவர்களுக்கான டிஜிட்டல் உளவியல் ஆதரவு",
       "nav.home": "முகப்பு",
       // ... add all keys
     }
   };
   ```

2. Add the language option to the `<select>` in [index.html](index.html):

   ```html
   <option value="ta">தமிழ்</option>
   ```

---

## 🛡️ Safety & Content Moderation

Manayush includes client-side safety mechanisms:

- **Crisis Keyword Detection** — The AI chat monitors for crisis-related terms (`suicide`, `self-harm`, `kill myself`, etc.) and responds with crisis resources
- **Peer Post Moderation** — Harmful content in peer support posts is automatically flagged and triggers the emergency help modal with **Tele MANAS** and campus counsellor contacts
- **Panic Button** — Always-visible "Need Help?" button in the header provides immediate access to helplines

> **⚠️ Disclaimer:** Manayush is **not** a medical device or diagnostic tool. It provides first-aid guidance only. In emergencies, users should contact their local emergency number, Tele MANAS (14416), or campus counsellor directly.

---

## 🔮 Roadmap

- [ ] Backend integration (Node.js / Firebase) for persistent data storage
- [ ] Real AI/ML-powered chat using NLP models
- [ ] Counsellor-side dashboard with appointment management
- [ ] Push notifications for booking confirmations
- [ ] Additional regional languages (Tamil, Telugu, Bengali, Marathi)
- [ ] PWA support for offline access
- [ ] Anonymous mood heatmaps for institutional insights
- [ ] Integration with university SSO/authentication systems

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available for educational and non-commercial purposes.

---

## 🙏 Acknowledgments

- **Smart India Hackathon 2025 (Internal Edition)** — For the platform and problem statement
- **Tele MANAS** — India's national mental health helpline
- [Chart.js](https://www.chartjs.org/) — Beautiful, flexible charting library
- [Google Fonts (Inter)](https://fonts.google.com/specimen/Inter) — Clean, modern typography
- [SVG Repo](https://www.svgrepo.com/) — Heart logo asset

---

<p align="center">
  <strong>Built with 💜 for student well-being</strong>
  <br/>
  <sub>If you or someone you know is struggling, please reach out. You are not alone.</sub>
  <br/><br/>
  <a href="https://github.com/ArshilTech/Manayaush_SIH">⭐ Star this repo</a> · 
  <a href="https://github.com/ArshilTech/Manayaush_SIH/issues">🐛 Report Bug</a> · 
  <a href="https://github.com/ArshilTech/Manayaush_SIH/issues">💡 Request Feature</a>
</p>

---

## 🔗 Check it out: https://arshiltech.github.io/Manayaush_SIH