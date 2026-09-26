# ONE Dating App — Website

> Claude Code project context. Every Claude session on this codebase loads this file automatically.
> Keep it up to date as the project evolves.

## What this project is

Marketing and early-access registration site for **ONE** — India's intentional dating app.
5 swipes per day, verified profiles, private gift delivery after matching.
The website is a **pre-launch waitlist site** in "coming soon" state. The mobile app does not yet exist.

**Live target:** Firebase Hosting  
**Backend:** Not yet built. All API calls in `src/lib/api.js` are wired and ready; fall back to `localStorage` until the backend is live.

---

## Quick start (first time)

```bash
bash setup.sh          # install deps + start dev server
# or
bash setup.sh --no-start   # setup only
npm run dev                # start server after setup
```

Dev server → **http://localhost:5173**  
Admin panel → **http://localhost:5173/admin/login** (not linked from any public page)

**Dev admin credentials (no Firebase needed):**
```
Email:    admin@one.dev
Password: one@admin123
```

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite 5 (SPA, ESM) |
| Styling | Tailwind CSS v3 + DaisyUI v4 (custom theme `one`) |
| Routing | React Router v6 |
| Forms | React Hook Form v7 |
| Notifications | React Hot Toast |
| Auth | Firebase Authentication (email/password, admin only) |
| Hosting | Firebase Hosting |
| Language | JavaScript (no TypeScript) |

---

## Design system

### Brand — "Rose Editorial"

| Token | Value | Usage |
|---|---|---|
| `rose` | `#C41247` | Primary CTA, active states, headings accent |
| `rose-dark` | `#8B0C33` | Button hover |
| `rose-light` | `#FCE7EF` | Backgrounds, badges |
| `rose-muted` | `#F9D5E5` | Subtle fills |
| `coral` | `#F4613C` | Secondary accent, eyebrow labels |
| `ivory` | `#FFF8F5` | Page background |
| `cream` | `#F5EDE7` | Section backgrounds |
| `text-primary` | `#1A0A12` | Body text, also used as dark section background |
| `text-mid` | `#5C3246` | Secondary text |
| `text-muted` | `#9B7488` | Labels, captions |
| `border-rose` | `#EDCFD9` | All borders |

### Typography

- **Display / headings:** `font-display` → Fraunces (Google Fonts, serif, italic weights)
- **Body / UI:** `font-sans` → Outfit (Google Fonts, geometric sans)
- Loaded via `<link>` in `index.html` — do not use `@import` in CSS

### Reusable CSS classes (`src/index.css`)

```
.btn-rose          Primary rose button (bg-rose, hover:-translate-y-px)
.btn-rose-outline  Outlined rose button
.input-rose        Form text input
.select-rose       Form select (extends input-rose)
.card-rose         White card with border-rose
.section-eyebrow   Small all-caps label with leading line
.section-title     Responsive display heading (clamp 28px–48px)
.section-body      Body paragraph (15px, font-light)
.reveal            Scroll-reveal element (starts opacity:0, translateY:22px)
.reveal-stagger    Parent — staggers children with CSS custom property delays
.revealed          Added by IntersectionObserver when element enters view
.animate-float     Floating animation (used on phone illustration badges)
```

---

## Architecture decisions

### No direct Firestore writes from client
All data mutations go through `src/lib/api.js` → backend API.
Firebase SDK is imported only for Authentication (`src/lib/firebase.js`).
This keeps security rules simple and server-side validation central.

### API-first but localStorage fallback
`submitEarlyAccess()` tries the backend; on any failure it saves to `localStorage('one-registrations')`.
The admin dashboard reads from `localStorage` in dev mode, so registration data persists locally end-to-end without a backend.

### Firebase config is public (by design)
`VITE_FIREBASE_*` values in `.env` are public identifiers — safe in client bundles.
Real access control is enforced by Firebase Security Rules on the server, not by hiding the config.

### Admin panel is URL-only hidden
`/admin/login` and `/admin/dashboard` have no links anywhere on the public site.
Security is through Firebase Auth (or dev fallback), not through obscurity of the URL.

### Dev auth fallback
When Firebase is not configured, `src/lib/devAuth.js` provides a hardcoded fallback:
- `devLogin(email, password)` validates against constants and sets `sessionStorage`
- `AuthContext` checks Firebase first, then dev session
- Admin dashboard detects `user.isDev === true` and reads localStorage instead of calling the API
- Shows an amber "Dev mode" banner on the dashboard

---

## File structure

```
src/
├── main.jsx                   App entry — providers: BrowserRouter > LanguageProvider > AuthProvider
├── App.jsx                    Route definitions
├── index.css                  Global styles, Tailwind layers, .reveal animation classes
│
├── lib/
│   ├── firebase.js            Firebase app init, exports `auth`
│   ├── api.js                 All backend calls (submitEarlyAccess, getRegistrations, exportCSV)
│   └── devAuth.js             Dev-only fallback auth (constants, devLogin, devLogout, getDevUser)
│
├── context/
│   ├── AuthContext.jsx        Firebase + dev auth state, exposes { user, loading, logout }
│   └── LanguageContext.jsx    i18n state, exposes { lang, switchLang, t }
│
├── hooks/
│   └── useScrollReveal.js     IntersectionObserver hook — adds .revealed to ref element
│
├── i18n/
│   └── translations.js        Translation objects for all supported languages
│
├── components/
│   ├── Navbar.jsx             Sticky header — logo, nav links, language switcher, download dropdown, Join CTA
│   ├── Footer.jsx             Footer with newsletter input
│   ├── LanguageSwitcher.jsx   Globe-icon dropdown, exports LANGUAGES array
│   ├── ProtectedRoute.jsx     Redirects to /admin/login if not authenticated
│   ├── HeroSection.jsx        Landing hero with headline + RegistrationForm
│   ├── StatsBar.jsx           Scrolling stats strip (verified, swipes, etc.)
│   ├── CategoryCards.jsx      Dating / Travel Buddy / Party Buddy cards with stagger animation
│   ├── GiftBanner.jsx         Gift feature banner linking to /explore-gifts
│   ├── HowItWorks.jsx         4-step process cards with stagger animation
│   ├── AppDownload.jsx        Dark section — phone illustration + store buttons (coming soon)
│   └── RegistrationForm.jsx   Early access form — React Hook Form, localStorage fallback, success state
│
└── pages/
    ├── Home.jsx               Assembles all sections in order
    ├── Dating.jsx             Dating feature page
    ├── TravelBuddy.jsx        Travel Buddy feature page
    ├── PartyBuddy.jsx         Party Buddy feature page
    ├── Safety.jsx             Safety & verification page
    ├── Membership.jsx         Membership tiers page
    ├── ExploreGifts.jsx       Gift shop page (4 categories, partners, how-it-works)
    ├── NotFound.jsx           404 page
    └── admin/
        ├── AdminLogin.jsx     Dark login form — Firebase first, dev fallback, credential hint toggle
        └── AdminDashboard.jsx Full admin UI — stats, filters, card/table view, user detail panel
```

---

## Routes

| Path | Page | Auth |
|---|---|---|
| `/` | Home | Public |
| `/dating` | Dating | Public |
| `/travel-buddy` | Travel Buddy | Public |
| `/party-buddy` | Party Buddy | Public |
| `/safety` | Safety | Public |
| `/membership` | Membership | Public |
| `/explore-gifts` | Explore Gifts | Public |
| `/admin/login` | Admin Login | Public (not linked) |
| `/admin/dashboard` | Admin Dashboard | Protected — Firebase or dev auth |
| `*` | NotFound | Public |

---

## Internationalization (i18n)

**17 supported locales** in `src/i18n/translations.js`:

| Code | Language | Status |
|---|---|---|
| `en` / `en-IN` / `en-US` / `en-GB` / `en-CA` / `en-AU` | English | Full |
| `hi` | हिन्दी | Full |
| `de` | Deutsch | Full |
| `fr` / `fr-CA` | Français | Full |
| `es` / `es-MX` | Español | Full |
| `it` | Italiano | Partial (key strings) |
| `pt-BR` | Português | Partial |
| `ru` | Русский | Partial |
| `zh-CN` | 中文 (简体) | Partial |
| `id` | Bahasa Indonesia | Partial |
| `da` | Dansk | Partial |

**Fallback chain:** exact code → base language (`fr-CA` → `fr`) → `en`

**Using translations in a component:**
```jsx
import { useLang } from '../context/LanguageContext.jsx'

export default function MyComponent() {
  const { t } = useLang()
  return <h1>{t.hero.headline}</h1>
}
```

**Translation object shape:** `t.nav`, `t.hero`, `t.form`, `t.stats`, `t.categories`, `t.gift`, `t.howItWorks`, `t.appDownload`, `t.footer`

To add a new language: add an entry to `translations.js` spreading `en` as base, then override strings. Add to `LANGUAGES` array in `LanguageSwitcher.jsx`.

---

## Scroll reveal animations

**Hook:** `src/hooks/useScrollReveal.js`
```jsx
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const ref = useScrollReveal({ threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
return <div ref={ref} className="reveal">...</div>
```

**Stagger children:** attach `reveal-stagger` to the parent (no hook needed on parent — hook on the ref, class on the wrapper).
```jsx
const gridRef = useScrollReveal({ threshold: 0.08 })
return (
  <div ref={gridRef} className="reveal-stagger grid grid-cols-3 gap-4">
    <div>Card 1</div>  {/* delays: 0ms, 90ms, 180ms, 270ms */}
    <div>Card 2</div>
    <div>Card 3</div>
  </div>
)
```

`prefers-reduced-motion` is respected — elements are immediately shown when motion is reduced.

---

## Admin dashboard

- **Stats row:** Total, Women (%), Men (%), Top City, This Week
- **Filters:** search, city, gender, intent — all combinable
- **Views:** Card grid (default) and Table — toggle top-right
- **User detail panel:** click any card or row → slide-in drawer with all fields
- **Export:** CSV download from backend or localStorage in dev mode
- **Seed data:** 10 realistic profiles shown in dev mode when localStorage is empty (`SEED` constant in `AdminDashboard.jsx`)

---

## What needs the backend

When a backend is built, wire these endpoints in `src/lib/api.js`:

| Endpoint | Method | Auth | Purpose |
|---|---|---|---|
| `/api/early-access` | POST | None | Save registration |
| `/api/admin/registrations` | GET | Bearer token | List all registrations |
| `/api/admin/registrations/export` | GET | Bearer token | Download CSV |

The token is a Firebase ID token obtained via `user.getIdToken()`.
Backend should verify it with the Firebase Admin SDK.
Once live, remove the `localStorage` fallback from `RegistrationForm.jsx` and `AdminDashboard.jsx`.

---

## Environment variables

```env
# .env (git-ignored — copy from .env.example)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_BASE_URL=          # backend base URL, e.g. https://api.one-app.in
```

All `VITE_*` variables are bundled into the client. Never put secrets here.
Firebase SDK config values are public identifiers — intentionally in client code.

---

## Coding conventions

- **No TypeScript** — plain `.js` / `.jsx`
- **No comments** unless the WHY is non-obvious (hidden constraint, workaround, subtle invariant)
- **No extra abstractions** — three similar lines is fine; don't extract until there are 4+
- **Tailwind-first** — all styling via Tailwind utility classes; avoid inline styles except for dynamic values (`clamp()`, CSS custom properties)
- **API calls only in `src/lib/api.js`** — components never call `fetch()` directly
- **No direct Firestore from client** — ever
- **Scroll animations:** use `useScrollReveal` hook + `.reveal` / `.reveal-stagger` CSS classes — don't add new animation libraries
- **i18n:** every user-visible string in a component that already uses `useLang()` should use `t.*`. New sections should add keys to `translations.js` for both `en` and `hi` at minimum
- **Form state:** React Hook Form — don't use `useState` for form fields

---

## Known limitations / next steps

- [ ] **Backend API** — build and connect `POST /api/early-access` and admin endpoints
- [ ] **Real photos** — category card gradients are placeholders; replace with actual photography
- [ ] **App Store links** — hardcoded as "Coming Soon"; update when app is live
- [ ] **Complete translations** — `it`, `pt-BR`, `ru`, `zh-CN`, `id`, `da` have only key strings; full translation needed
- [ ] **Footer newsletter** — input is UI only; wire to an email list (Mailchimp, etc.)
- [ ] **Dating / Travel / Party / Safety / Membership pages** — have basic structure; need real content
- [ ] **Explore Gifts page** — categories and partners are placeholder; wire to real gift catalogue
- [ ] **Firebase Security Rules** — set up before going live
- [ ] **OG / meta tags** — add `<meta property="og:*">` for social sharing
