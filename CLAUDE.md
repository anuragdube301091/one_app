# ONE Dating App — Website

> Claude Code project context. Every Claude session on this codebase loads this file automatically.
> Keep it up to date as the project evolves.

## What this project is

Marketing and early-access registration site for **ONE** — India's intentional dating app.
5 swipes per day, verified profiles, private gift delivery after matching.
The website is a **pre-launch waitlist site** in "coming soon" state. The mobile app does not yet exist.

**Live (dev):** https://anuragdube301091.github.io/one_app/
**Repo:** `github.com/anuragdube301091/one_app` — branch `main`
**Backend:** Not yet built. All API calls in `src/lib/api.js` are wired and ready; they fall back to `localStorage` until the backend is live.

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
| Auth | Firebase Authentication (email/password, admin only) + dev fallback |
| Hosting | **GitHub Pages** via GitHub Actions |
| Language | JavaScript (no TypeScript) |

> `firebase.json` / `.firebaserc` are still in the repo from the original Firebase Hosting plan.
> They are **not** used by the current deployment. Delete them if Firebase Hosting is ruled out.

---

## Deployment (GitHub Pages)

Every push to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci && npm run build`
and publishes `dist/` to GitHub Pages. Takes ~2 minutes.

**One-time setup already done** (don't redo unless the repo is recreated):
- Repo **Settings → Pages → Source** is set to **GitHub Actions** (not "Deploy from a branch")

### Three things make an SPA work on a project page

The site is served from a **subpath** (`/one_app/`), not a domain root. All three must stay in sync:

1. **`vite.config.js`** — `base: process.env.NODE_ENV === 'production' ? '/one_app/' : '/'`
   Production assets resolve to `/one_app/assets/…`; local dev stays at `/`.

2. **`src/main.jsx`** — `<BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>`
   Derived from the Vite base so it's correct in both environments automatically.
   **Without this, every `<Link>` navigates outside the app and 404s.**

3. **`public/404.html` + the inline script in `index.html`** — the
   [spa-github-pages](https://github.com/rafgraph/spa-github-pages) redirect pair.
   GitHub Pages has no server-side rewrite, so a direct hit on `/one_app/explore-gifts` returns
   its 404 page; that page re-encodes the path as `/one_app/?/explore-gifts` and `index.html`
   restores it with `history.replaceState`.

> **If the repo is ever renamed**, update the `base` in `vite.config.js`. The router basename and
> the 404 script both derive from it, so that one line is the only change needed.

> **`pathSegmentsToKeep = 1` in `404.html` is load-bearing.** It strips the repo segment before
> encoding. Removing it makes `index.html` re-prepend `/one_app`, and the URL grows
> `/one_app/one_app/one_app/…` on every reload.

### Firebase secrets (optional)

The workflow passes `VITE_FIREBASE_*` from repo secrets
(**Settings → Secrets and variables → Actions**). None are set today, so the build ships with
empty values and the app runs on dev auth. Add them to enable real Firebase auth in production.

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
The admin dashboard reads from `localStorage` in dev mode, so registration data persists locally
end-to-end without a backend.

### Firebase config is public (by design)
`VITE_FIREBASE_*` values are public identifiers — safe in client bundles.
Real access control is enforced by Firebase Security Rules on the server, not by hiding the config.

### Firebase initialises only when configured
`src/lib/firebase.js` checks for a real API key before calling `initializeApp`, and **exports
`auth = null`** when absent. Calling `initializeApp` with an empty key throws
`auth/invalid-api-key` at module load, which blanks the entire page.

**Every consumer must handle `auth === null`.** `AuthContext` skips `onAuthStateChanged`;
`AdminLogin` skips the Firebase call and goes straight to dev credentials.

### Admin panel is URL-only hidden
`/admin/login` and `/admin/dashboard` have no links anywhere on the public site.
Security is through Firebase Auth (or dev fallback), not through obscurity of the URL.

### Dev auth fallback
When Firebase is not configured, `src/lib/devAuth.js` provides a hardcoded fallback:
- `devLogin(email, password)` validates against constants and writes a `sessionStorage` flag
- `AuthContext` seeds `user` from `getDevUser()` and exposes `loginDev()` / `logout()`
- Admin dashboard detects `user.isDev === true` and reads localStorage instead of calling the API
- Shows an amber "Dev mode" banner on the dashboard

> **Always log in via `loginDev()` from `AuthContext` — never `devLogin()` directly.**
> `devLogin` only writes `sessionStorage`; it does not touch React state. Calling it directly
> leaves `AuthContext.user` as `null`, so `ProtectedRoute` bounces you back to the login page and
> the dashboard only appears after a manual reload. `loginDev()` wraps it and calls `setUser()`.

---

## File structure

```
.github/workflows/
└── deploy.yml                 Build + deploy to GitHub Pages on push to main

public/
└── 404.html                   GitHub Pages SPA redirect (pathSegmentsToKeep = 1)

index.html                     Fonts, meta, + SPA path-restore script

src/
├── main.jsx                   Entry — BrowserRouter (basename) > LanguageProvider > AuthProvider
├── App.jsx                    Route definitions
├── index.css                  Global styles, Tailwind layers, .reveal animation classes
│
├── lib/
│   ├── firebase.js            Conditional Firebase init — exports `auth` (null when unconfigured)
│   ├── api.js                 All backend calls (submitEarlyAccess, getRegistrations, exportCSV)
│   └── devAuth.js             Dev-only fallback (DEV_EMAIL/PASSWORD, devLogin, devLogout, getDevUser)
│
├── context/
│   ├── AuthContext.jsx        Auth state — exposes { user, loading, loginDev, logout }
│   └── LanguageContext.jsx    i18n state — exposes { lang, switchLang, t }
│
├── hooks/
│   └── useScrollReveal.js     IntersectionObserver hook — adds .revealed to ref element
│
├── i18n/
│   └── translations.js        Per-language objects + deepMerge fallback over `en`
│
├── components/
│   ├── Navbar.jsx             Sticky header — logo, nav, language switcher, download dropdown, CTA
│   ├── Footer.jsx             Footer with newsletter input
│   ├── LanguageSwitcher.jsx   Globe-icon dropdown, exports LANGUAGES array
│   ├── ProtectedRoute.jsx     Redirects to /admin/login if not authenticated
│   ├── HeroSection.jsx        Landing hero with headline + RegistrationForm (#register anchor)
│   ├── StatsBar.jsx           Stats strip (verified, swipes, etc.)
│   ├── CategoryCards.jsx      Dating / Travel Buddy / Party Buddy cards with stagger animation
│   ├── GiftBanner.jsx         Gift feature banner linking to /explore-gifts
│   ├── HowItWorks.jsx         4-step process cards — copy from t.howItWorks.steps
│   ├── AppDownload.jsx        Dark section — phone illustration + store buttons (coming soon)
│   └── RegistrationForm.jsx   Early access form — React Hook Form, localStorage fallback
│
└── pages/
    ├── Home.jsx               Assembles all sections in order
    ├── Dating.jsx             Dating feature page
    ├── TravelBuddy.jsx        Travel Buddy feature page
    ├── PartyBuddy.jsx         Party Buddy feature page
    ├── Safety.jsx             Safety & verification page
    ├── Membership.jsx         Membership tiers page
    ├── ExploreGifts.jsx       Gift shop page — fully translated via t.gifts
    ├── NotFound.jsx           404 page
    └── admin/
        ├── AdminLogin.jsx     Dark login form — Firebase then dev fallback, credential hint toggle
        └── AdminDashboard.jsx Admin UI — stats, filters, card/table view, user detail panel
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

Paths above are **router paths**. In production every URL is prefixed with `/one_app` by the
router basename — write `<Link to="/explore-gifts">`, never `/one_app/explore-gifts`.

---

## Internationalization (i18n)

**17 locale codes** in `src/i18n/translations.js`.

### Fallback is a deep merge, not a lookup

Every locale is merged over `en` at export time:

```js
const withFallback = (lang) => deepMerge(en, lang)
```

A missing key renders **English** instead of crashing. This matters because most locales define
only a few sections — before the merge existed, selecting Italian made `t.stats` `undefined` and
`t.stats.verified` threw, blanking the page.

`LanguageContext` then resolves: exact code → base language (`fr-CA` → `fr`) → `en`.

### Coverage

| Code | Language | Coverage |
|---|---|---|
| `en` / `en-IN` / `en-US` / `en-GB` / `en-CA` / `en-AU` | English | **Full** — source of truth |
| `hi` | हिन्दी | **Full** — all sections including `gifts` and `howItWorks.steps` |
| `de` / `fr` / `fr-CA` / `es` / `es-MX` | Deutsch / Français / Español | Partial — `nav`, `hero`, `form`, `gift`, `footer` |
| `it` / `pt-BR` / `ru` / `zh-CN` / `id` / `da` | Italiano / Português / Русский / 中文 / Indonesia / Dansk | Partial — `nav`, `hero`, `form`, `gift` |

Everything not listed falls back to English. Nothing crashes.

### Using translations

```jsx
import { useLang } from '../context/LanguageContext.jsx'

export default function MyComponent() {
  const { t } = useLang()
  return <h1>{t.hero.headline}</h1>
}
```

**Sections:** `t.nav`, `t.hero`, `t.form`, `t.stats`, `t.categories`, `t.gift` (home banner),
`t.howItWorks` (incl. `.steps[]`), `t.appDownload`, `t.footer`, `t.gifts` (Explore Gifts page).

> `t.gift` (singular) is the **home page banner**. `t.gifts` (plural) is the **Explore Gifts page**.

**Adding a language:** add an object to `translations.js`, register it as
`withFallback(yourLang)` in the export, and add it to `LANGUAGES` in `LanguageSwitcher.jsx`.
Only override what you translate — the merge fills the rest.

**Adding a string:** add it to `en` first (that's the fallback every locale inherits), then
translate into `hi` at minimum.

---

## Scroll reveal animations

**Hook:** `src/hooks/useScrollReveal.js`
```jsx
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const ref = useScrollReveal({ threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
return <div ref={ref} className="reveal">...</div>
```

**Stagger children:** attach `reveal-stagger` to the parent (hook on the ref, class on the wrapper).
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

`prefers-reduced-motion` is respected — elements are shown immediately when motion is reduced.

---

## Admin dashboard

- **Stats row:** Total, Women (%), Men (%), Top City, This Week
- **Filters:** search, city, gender, intent — all combinable
- **Views:** Card grid (default) and Table — toggle top-right
- **User detail panel:** click any card or row → slide-in drawer with all fields
- **Export:** CSV download from backend, or generated client-side in dev mode
- **Seed data:** 10 realistic profiles shown in dev mode when localStorage is empty
  (`SEED` constant in `AdminDashboard.jsx`)
- **Sign out:** calls `logout()` from `AuthContext`, which clears the dev session *and* signs out
  of Firebase when a real user is present

---

## What needs the backend

When a backend is built, wire these endpoints in `src/lib/api.js`:

| Endpoint | Method | Auth | Purpose |
|---|---|---|---|
| `/api/early-access` | POST | None | Save registration |
| `/api/admin/registrations` | GET | Bearer token | List all registrations |
| `/api/admin/registrations/export` | GET | Bearer token | Download CSV |

The token is a Firebase ID token from `user.getIdToken()`; verify it with the Firebase Admin SDK.
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

All `VITE_*` variables are bundled into the client. **Never put secrets here.**
Firebase SDK config values are public identifiers — intentionally in client code.

Leaving these blank is supported: the app runs on dev auth with a `localStorage` data layer.

---

## Coding conventions

- **No TypeScript** — plain `.js` / `.jsx`
- **No comments** unless the WHY is non-obvious (hidden constraint, workaround, subtle invariant)
- **No extra abstractions** — three similar lines is fine; don't extract until there are 4+
- **Tailwind-first** — avoid inline styles except for dynamic values (`clamp()`, CSS custom properties)
- **API calls only in `src/lib/api.js`** — components never call `fetch()` directly
- **No direct Firestore from client** — ever
- **Router links are basename-relative** — `<Link to="/explore-gifts">`, never `/one_app/...`
- **Auth goes through `AuthContext`** — never call `devLogin`/`signOut` directly from a component
- **Scroll animations** — use `useScrollReveal` + `.reveal` / `.reveal-stagger`; no new animation libraries
- **i18n** — no user-visible string is hardcoded in a component; add to `en` + `hi` at minimum
- **Form state** — React Hook Form; don't use `useState` for form fields

---

## Gotchas that have already bitten this project

Each of these produced a silent, hard-to-diagnose failure. Read before debugging a blank page.

| Symptom | Cause |
|---|---|
| Blank page, `auth/invalid-api-key` in console | `initializeApp` called with an empty key. `firebase.js` now guards it. |
| URL grows `/one_app/one_app/one_app/…` | `404.html` encoded the path without stripping the repo segment. `pathSegmentsToKeep = 1` fixes it. |
| Links 404 in production but work locally | `BrowserRouter` missing `basename`. |
| Login needs a manual reload to reach the dashboard | `devLogin()` called directly — bypasses React state. Use `loginDev()`. |
| Switching language changes nothing | The component hardcodes English instead of reading `t.*`. |
| Page blanks when a specific language is selected | A component reads a key that locale lacks, with no fallback merge. |
| Button does nothing | `onClick` calls `e.preventDefault()` on a `<Link>` without navigating. Use `useNavigate()`. |

---

## Verifying changes

```bash
npm run build          # must pass before pushing — CI runs the same build
npm run preview        # serves dist/ at localhost:4173/one_app/
```

When touching **routing, auth, or i18n**, check these by hand (they all broke at least once):

1. Deep-link straight to `/explore-gifts`, then reload — URL must stay stable
2. Switch to हिन्दी — navbar, hero, step cards and category descriptions must all change
3. Cycle every language on `/explore-gifts` — no blank pages
4. Admin login with correct credentials — dashboard must load **without a reload**
5. Admin login with a wrong password — must stay on login and show an error

---

## Known limitations / next steps

- [ ] **Backend API** — build and connect `POST /api/early-access` and the admin endpoints
- [ ] **Real photos** — category card gradients are placeholders; swap in real photography
- [ ] **App Store links** — hardcoded "Coming Soon"; update when the app ships
- [ ] **Finish translations** — `de`, `fr`, `es` need `stats` / `categories` / `howItWorks` / `gifts`;
      `it`, `pt-BR`, `ru`, `zh-CN`, `id`, `da` additionally need `footer`
- [ ] **Footer newsletter** — input is UI only; wire to an email list (Mailchimp, etc.)
- [ ] **Dating / Travel / Party / Safety / Membership pages** — structure exists, need real content
- [ ] **Explore Gifts** — categories and partners are placeholder; wire to a real catalogue
- [ ] **Firebase Security Rules** — write before going live
- [ ] **OG / meta tags** — add `<meta property="og:*">` for social sharing
- [ ] **Custom domain** — currently on `github.io`; Pages settings has a Custom domain field
- [ ] **Remove Firebase Hosting leftovers** — `firebase.json` / `.firebaserc` are unused by CI
