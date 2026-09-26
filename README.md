# ONE Dating App — Website

Marketing and early-access registration site for **ONE**, India's intentional dating app.  
Built with React + Vite + Tailwind CSS + DaisyUI. Hosted on Firebase.

---

## Quick start

```bash
bash setup.sh
```

That's it. The script installs dependencies, creates `.env`, runs a build check, and starts the dev server at **http://localhost:5173**.

> **No Firebase needed to run locally.** The app works fully with a dev fallback — admin login uses dummy credentials, and registration data is saved to `localStorage`.

---

## Dev admin panel

| | |
|---|---|
| URL | http://localhost:5173/admin/login |
| Email | `admin@one.dev` |
| Password | `one@admin123` |

The admin panel is not linked from the public site — accessible by URL only.

---

## Commands

| Command | What it does |
|---|---|
| `bash setup.sh` | First-time setup + start dev server |
| `bash setup.sh --no-start` | Setup only, no dev server |
| `npm run dev` | Start dev server (after setup) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview prod build at localhost:4173 |
| `npm run deploy` | Build + deploy to Firebase Hosting |

---

## Project structure

```
src/
├── components/       # Shared UI (Navbar, Footer, forms, etc.)
├── context/          # AuthContext, LanguageContext
├── hooks/            # useScrollReveal
├── i18n/             # translations.js (EN, HI + 10 other languages)
├── lib/              # firebase.js, api.js, devAuth.js
└── pages/
    ├── Home.jsx
    ├── Dating.jsx
    ├── TravelBuddy.jsx
    ├── PartyBuddy.jsx
    ├── Safety.jsx
    ├── Membership.jsx
    ├── ExploreGifts.jsx
    └── admin/
        ├── AdminLogin.jsx
        └── AdminDashboard.jsx
```

---

## Firebase setup (when ready to connect)

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication → Email/Password**
3. Create an admin user: Authentication → Users → Add user
4. Go to **Project Settings → Your apps → SDK setup** and copy the config
5. Fill in `.env`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_API_BASE_URL=https://your-backend-url.com
```

> Firebase SDK values are public identifiers — safe in client code. Access is controlled by Firebase Security Rules on the server.

---

## Tech stack

- **React 18** + **Vite 5** — SPA, client-side routing
- **Tailwind CSS v3** + **DaisyUI v4** — custom "one" theme
- **React Router v6** — multi-page routing
- **React Hook Form** — form validation
- **React Hot Toast** — notifications
- **Firebase Auth** — admin authentication only
- **Firebase Hosting** — deployment target
- **i18n** — custom context (EN, HI, DE, FR, ES, IT, PT-BR, RU, ZH-CN, ID, DA + English variants)
