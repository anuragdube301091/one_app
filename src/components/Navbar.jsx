import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher.jsx'

const NAV_LINKS = [
  { to: '/dating', label: 'Dating' },
  { to: '/travel-buddy', label: 'Travel Buddy' },
  { to: '/party-buddy', label: 'Party Buddy' },
  { to: '/safety', label: 'Safety' },
  { to: '/membership', label: 'Membership' },
]

const AppleIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
)

const PlayIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3.18 23.76c.3.17.64.24.98.19L15.89 12 4.16.05c-.34-.05-.68.02-.98.19C2.57.61 2.25 1.31 2.25 2.1v19.8c0 .79.32 1.49.93 1.86z" />
    <path d="M19.4 9.1l-2.73-1.57L13.6 12l3.07 3.47 2.73-1.57c1.1-.64 1.1-2.16 0-2.8z" />
    <path d="M4.16.05l11.55 11.78-2.88 2.88L4.16.05z" opacity=".7" />
    <path d="M4.16 23.95L15.83 12.17 12.83 9.29 4.16 23.95z" opacity=".5" />
  </svg>
)

/* ── Store card inside the dropdown ── */
function StoreCard({ icon, label, sub }) {
  return (
    <div className="relative flex-1 flex flex-col items-center gap-2 px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.07] hover:bg-white/[0.12] cursor-not-allowed select-none transition-colors group">
      <div className="text-white/70 group-hover:text-white transition-colors">{icon}</div>
      <div className="text-center leading-none">
        <p className="text-white/50 text-[9px] uppercase tracking-[0.1em] mb-0.5">{sub}</p>
        <p className="text-white text-[13px] font-semibold whitespace-nowrap">{label}</p>
      </div>
      {/* Coming Soon tag */}
      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-coral text-white text-[8px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full whitespace-nowrap">
        Coming Soon
      </span>
    </div>
  )
}

/* ── Desktop download popover ── */
function DownloadDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onMouse = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onMouse)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onMouse); document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div ref={ref} className="relative">
      {/* ── Trigger: dark pill with both store icons ── */}
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Download ONE App"
        className={`group relative flex items-center gap-1.5 pl-4 pr-4 py-[7px] rounded-full transition-all duration-200 ${
          open
            ? 'bg-text-primary shadow-lg scale-[1.02]'
            : 'bg-text-primary hover:shadow-md hover:scale-[1.02]'
        }`}
      >
        <span className="text-white text-[13px] font-semibold tracking-tight">Download</span>
        {/* Pulsing SOON dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-coral" />
        </span>
      </button>

      {/* ── Dropdown card ── */}
      {open && (
        <div
          role="dialog"
          aria-label="Download the ONE app"
          className="absolute right-0 top-full mt-3 w-[280px] rounded-2xl overflow-hidden shadow-2xl z-50 animate-fade-in"
          style={{ background: 'linear-gradient(145deg, #1A0A12 0%, #2D0F1E 100%)' }}
        >
          {/* Top section */}
          <div className="px-5 pt-5 pb-4">
            {/* App identity */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-rose flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="font-display italic font-black text-white text-base leading-none">ONE</span>
              </div>
              <div>
                <p className="text-white font-bold text-[14px] leading-none mb-1">ONE Dating App</p>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-coral animate-pulse-dot" />
                  <p className="text-white/50 text-[11px]">Launching soon in India</p>
                </div>
              </div>
            </div>

            {/* Store buttons — side by side */}
            <div className="flex gap-2.5">
              <StoreCard
                icon={<AppleIcon size={22} />}
                sub="Download on the"
                label="App Store"
              />
              <StoreCard
                icon={<PlayIcon size={22} />}
                sub="Get it on"
                label="Google Play"
              />
            </div>
          </div>

          {/* Bottom nudge */}
          <div className="border-t border-white/10 bg-white/5 px-5 py-3.5 flex items-center justify-between gap-3">
            <p className="text-white/40 text-[11px] leading-snug">
              Want to be first in line?
            </p>
            <button
              className="flex-shrink-0 text-[11px] font-semibold text-coral hover:text-rose transition-colors"
              onClick={() => {
                setOpen(false)
                setTimeout(() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' }), 50)
              }}
            >
              Join waitlist →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Mobile download row (always visible, no accordion) ── */
function MobileDownloadRow({ onClose }) {
  return (
    <li className="border-t border-border-rose pt-3 mt-1">
      <p className="px-4 pb-2 text-[10px] font-bold tracking-[0.12em] uppercase text-text-muted">
        Download App
      </p>
      <div className="flex gap-2 px-2">
        {/* Apple */}
        <div className="relative flex-1 flex items-center gap-2.5 px-3 py-2.5 bg-text-primary rounded-xl cursor-not-allowed select-none">
          <span className="text-white"><AppleIcon size={18} /></span>
          <div className="leading-none">
            <p className="text-white/40 text-[8px] uppercase tracking-wide mb-0.5">Download on</p>
            <p className="text-white font-semibold text-[13px]">App Store</p>
          </div>
          <span className="absolute -top-1.5 -right-1.5 bg-coral text-white text-[7px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-full">
            Soon
          </span>
        </div>
        {/* Play */}
        <div className="relative flex-1 flex items-center gap-2.5 px-3 py-2.5 bg-text-primary rounded-xl cursor-not-allowed select-none">
          <span className="text-white"><PlayIcon size={18} /></span>
          <div className="leading-none">
            <p className="text-white/40 text-[8px] uppercase tracking-wide mb-0.5">Get it on</p>
            <p className="text-white font-semibold text-[13px]">Google Play</p>
          </div>
          <span className="absolute -top-1.5 -right-1.5 bg-coral text-white text-[7px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-full">
            Soon
          </span>
        </div>
      </div>
    </li>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border-rose shadow-sm">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex flex-col leading-none" aria-label="ONE Dating App – Home">
          <span className="font-display font-black text-[22px] tracking-tight text-text-primary italic">
            ON
            <span className="relative inline-block not-italic ml-px">
              <span className="relative z-10">E</span>
              <span
                aria-hidden="true"
                className="absolute bottom-[3px] left-0 right-0 h-[2.5px] bg-coral"
                style={{ marginBottom: '-1px' }}
              />
            </span>
          </span>
          <span className="text-[7px] font-semibold tracking-[0.12em] uppercase text-text-muted mt-0.5">
            Real People. Real Connections.
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-rose bg-rose-light'
                      : 'text-text-mid hover:text-text-primary hover:bg-cream'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
          <LanguageSwitcher compact />
          <DownloadDropdown />
          <Link
            to={isHome ? '#register' : '/'}
            className="btn-rose px-4 py-2.5 text-[13px] inline-block"
            onClick={isHome ? (e) => {
              e.preventDefault()
              document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
            } : undefined}
          >
            Join ONE →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-cream transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border-rose bg-white animate-fade-in">
          <ul className="flex flex-col px-4 py-3 gap-1 list-none m-0 p-0">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${
                      isActive ? 'text-rose bg-rose-light' : 'text-text-mid hover:text-rose hover:bg-rose-light'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}

            <MobileDownloadRow onClose={() => setOpen(false)} />

            <li className="pt-3 flex items-center justify-between gap-3">
              <LanguageSwitcher />
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="btn-rose flex-1 text-center py-3 text-[14px]"
              >
                Join ONE →
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
