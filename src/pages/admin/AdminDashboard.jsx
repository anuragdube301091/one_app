import { useState, useEffect, useCallback, useRef } from 'react'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../lib/firebase.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { getRegistrations, exportRegistrationsCSV } from '../../lib/api.js'
import { DEV_EMAIL } from '../../lib/devAuth.js'

// ── Seed data shown in dev mode when localStorage is empty ──────────────────
const SEED = [
  { name: 'Priya Sharma', email: 'priya.s@example.com', phone: '9876543210', countryCode: '+91', iam: 'woman', lookingFor: 'men', age: '25-30', city: 'Mumbai', intent: 'Long-term relationship', createdAt: '2025-09-20T10:30:00Z' },
  { name: 'Arjun Mehta', email: 'arjun.m@example.com', phone: '9765432109', countryCode: '+91', iam: 'man', lookingFor: 'women', age: '25-30', city: 'Delhi', intent: 'Marriage', createdAt: '2025-09-19T14:20:00Z' },
  { name: 'Sneha Kapoor', email: 'sneha.k@example.com', phone: '9654321098', countryCode: '+91', iam: 'woman', lookingFor: 'everyone', age: '18-24', city: 'Bangalore', intent: 'Casual dating', createdAt: '2025-09-18T09:15:00Z' },
  { name: 'Rahul Verma', email: 'rahul.v@example.com', phone: '9543210987', countryCode: '+91', iam: 'man', lookingFor: 'women', age: '31-40', city: 'Mumbai', intent: 'Marriage', createdAt: '2025-09-17T16:45:00Z' },
  { name: 'Aisha Khan', email: 'aisha.k@example.com', phone: '9432109876', countryCode: '+91', iam: 'woman', lookingFor: 'men', age: '25-30', city: 'Hyderabad', intent: 'Not sure yet', createdAt: '2025-09-16T11:00:00Z' },
  { name: 'Vikram Nair', email: 'vikram.n@example.com', phone: '9321098765', countryCode: '+91', iam: 'man', lookingFor: 'women', age: '25-30', city: 'Bangalore', intent: 'Long-term relationship', createdAt: '2025-09-15T13:30:00Z' },
  { name: 'Pooja Reddy', email: 'pooja.r@example.com', phone: '9210987654', countryCode: '+91', iam: 'woman', lookingFor: 'men', age: '18-24', city: 'Chennai', intent: 'Long-term relationship', createdAt: '2025-09-14T08:20:00Z' },
  { name: 'Dev Malhotra', email: 'dev.m@example.com', phone: '9109876543', countryCode: '+91', iam: 'man', lookingFor: 'women', age: '31-40', city: 'Pune', intent: 'Marriage', createdAt: '2025-09-13T17:10:00Z' },
  { name: 'Riya Joshi', email: 'riya.j@example.com', phone: '9098765432', countryCode: '+91', iam: 'woman', lookingFor: 'men', age: '25-30', city: 'Mumbai', intent: 'Casual dating', createdAt: '2025-09-12T12:00:00Z' },
  { name: 'Karan Singh', email: 'karan.s@example.com', phone: '8987654321', countryCode: '+91', iam: 'man', lookingFor: 'everyone', age: '18-24', city: 'Delhi', intent: 'Not sure yet', createdAt: '2025-09-11T15:45:00Z' },
]

// ── Helpers ─────────────────────────────────────────────────────────────────
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?'
}

const AVATAR_COLORS = [
  'from-rose to-[#E8809A]', 'from-coral to-orange-400',
  'from-purple-400 to-purple-600', 'from-sky-400 to-blue-500',
  'from-emerald-400 to-teal-500', 'from-amber-400 to-orange-500',
]
function avatarColor(name = '') {
  let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length]
}

const INTENT_BADGE = {
  'Marriage':              'bg-rose/20 text-rose border-rose/20',
  'Long-term relationship': 'bg-coral/20 text-coral border-coral/20',
  'Casual dating':         'bg-purple-500/20 text-purple-300 border-purple-500/20',
  'Not sure yet':          'bg-white/10 text-white/50 border-white/10',
}
const IAM_BADGE = {
  man:       'bg-sky-500/20 text-sky-300',
  woman:     'bg-rose/20 text-rose',
  nonbinary: 'bg-purple-500/20 text-purple-300',
}

// ── Sub-components ───────────────────────────────────────────────────────────
function Avatar({ name, size = 'md' }) {
  const sz = size === 'lg' ? 'w-16 h-16 text-xl' : size === 'sm' ? 'w-8 h-8 text-xs' : 'w-11 h-11 text-sm'
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${avatarColor(name)} flex items-center justify-center font-bold text-white flex-shrink-0`}>
      {initials(name)}
    </div>
  )
}

function StatCard({ label, value, sub, accent = false }) {
  return (
    <div className={`rounded-2xl border px-5 py-5 flex flex-col gap-1 ${accent ? 'bg-rose/10 border-rose/20' : 'bg-white/[0.04] border-white/10'}`}>
      <p className="text-white/40 text-[11px] font-semibold tracking-widest uppercase">{label}</p>
      <p className={`font-display italic font-black text-3xl leading-none ${accent ? 'text-rose' : 'text-white'}`}>{value}</p>
      {sub && <p className="text-white/30 text-[11px] mt-0.5">{sub}</p>}
    </div>
  )
}

function Badge({ text, cls }) {
  return (
    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${cls}`}>
      {text}
    </span>
  )
}

function UserCard({ user, onClick }) {
  const intent = user.intent || ''
  return (
    <button
      onClick={() => onClick(user)}
      className="w-full text-left bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all duration-150 group"
    >
      <div className="flex items-start gap-3.5 mb-4">
        <Avatar name={user.name} />
        <div className="min-w-0 flex-1">
          <p className="text-white font-semibold text-[14px] truncate leading-tight">{user.name || '—'}</p>
          <p className="text-white/40 text-[12px] truncate mt-0.5">{user.email || '—'}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {user.iam && <Badge text={user.iam} cls={IAM_BADGE[user.iam] || 'bg-white/10 text-white/50'} />}
        {user.age && <Badge text={user.age} cls="bg-white/10 text-white/50 border-white/10" />}
        {user.city && (
          <Badge
            text={user.city}
            cls="bg-white/10 text-white/50 border-white/10"
          />
        )}
      </div>

      {intent && (
        <p className={`text-[11px] font-medium px-2.5 py-1 rounded-full border inline-block ${INTENT_BADGE[intent] || 'bg-white/10 text-white/40 border-white/10'}`}>
          {intent}
        </p>
      )}

      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
        <p className="text-white/30 text-[10px]">
          {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
        </p>
        <span className="text-rose text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          View →
        </span>
      </div>
    </button>
  )
}

function UserDetailPanel({ user, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!user) return null

  const rows = [
    { label: 'Full Name', value: user.name },
    { label: 'Email', value: user.email },
    { label: 'Phone', value: user.phone ? `${user.countryCode || '+91'} ${user.phone}` : null },
    { label: 'I am', value: user.iam },
    { label: 'Looking for', value: user.lookingFor },
    { label: 'Age', value: user.age },
    { label: 'City', value: user.city },
    { label: 'Intent', value: user.intent },
    { label: 'Registered', value: user.createdAt ? new Date(user.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : null },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={ref}
        role="dialog"
        aria-label={`Profile: ${user.name}`}
        aria-modal="true"
        className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#13101F] border-l border-white/10 z-50 flex flex-col shadow-2xl"
        style={{ animation: 'slideInRight 0.22s cubic-bezier(0.22,1,0.36,1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
          <p className="text-white/40 text-xs font-semibold tracking-widest uppercase">User Profile</p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Avatar + name */}
        <div className="px-6 py-6 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <Avatar name={user.name} size="lg" />
            <div>
              <p className="text-white font-bold text-lg leading-tight">{user.name || '—'}</p>
              <p className="text-white/40 text-sm mt-0.5">{user.email || '—'}</p>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {user.iam && <Badge text={user.iam} cls={IAM_BADGE[user.iam] || 'bg-white/10 text-white/50'} />}
                {user.intent && (
                  <Badge text={user.intent} cls={INTENT_BADGE[user.intent] || 'bg-white/10 text-white/40 border-white/10'} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fields */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="space-y-0 divide-y divide-white/5">
            {rows.map(({ label, value }) => (
              <li key={label} className="flex items-start justify-between gap-4 py-3.5">
                <span className="text-white/40 text-xs font-medium flex-shrink-0 w-24 pt-0.5">{label}</span>
                <span className="text-white/80 text-sm text-right capitalize leading-snug">
                  {value || '—'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex-shrink-0">
          <p className="text-white/20 text-[10px] text-center">
            Registered via ONE Early Access waitlist
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </>
  )
}

// ── Main dashboard ───────────────────────────────────────────────────────────
const CITIES = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata']
const GENDERS = ['All', 'man', 'woman', 'nonbinary']
const INTENTS = ['All', 'Marriage', 'Long-term relationship', 'Casual dating', 'Not sure yet']

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const isDevMode = user?.isDev === true

  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('All Cities')
  const [genderFilter, setGenderFilter] = useState('All')
  const [intentFilter, setIntentFilter] = useState('All')
  const [view, setView] = useState('cards') // 'cards' | 'table'
  const [selected, setSelected] = useState(null)
  const [exporting, setExporting] = useState(false)

  const fetchData = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError('')
    try {
      if (isDevMode) {
        const saved = JSON.parse(localStorage.getItem('one-registrations') || '[]')
        setRegistrations(saved.length ? saved : SEED)
      } else {
        const idToken = await user.getIdToken()
        const data = await getRegistrations(idToken)
        setRegistrations(data.registrations ?? data)
      }
    } catch (err) {
      setError(err.message || 'Failed to load registrations.')
    } finally {
      setLoading(false)
    }
  }, [user, isDevMode])

  useEffect(() => { fetchData() }, [fetchData])

  async function handleExport() {
    if (isDevMode) {
      // Export localStorage / seed data as CSV in dev mode
      const headers = ['Name', 'Email', 'Phone', 'I am', 'Looking for', 'Age', 'City', 'Intent', 'Registered']
      const rows = registrations.map(r => [
        r.name, r.email, `${r.countryCode || '+91'} ${r.phone}`,
        r.iam, r.lookingFor, r.age, r.city, r.intent,
        r.createdAt ? new Date(r.createdAt).toISOString() : '',
      ])
      const csv = [headers, ...rows].map(r => r.map(v => `"${(v ?? '').toString().replace(/"/g, '""')}"`).join(',')).join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      downloadBlob(blob, `one-registrations-${new Date().toISOString().slice(0, 10)}.csv`)
      return
    }
    setExporting(true)
    try {
      const idToken = await user.getIdToken()
      const blob = await exportRegistrationsCSV(idToken)
      downloadBlob(blob, `one-registrations-${new Date().toISOString().slice(0, 10)}.csv`)
    } catch (err) {
      alert('Export failed: ' + err.message)
    } finally {
      setExporting(false)
    }
  }

  async function handleSignOut() {
    if (isDevMode) { logout() } else { await signOut(auth) }
    navigate('/admin/login', { replace: true })
  }

  // Derived stats
  const total = registrations.length
  const women = registrations.filter(r => r.iam === 'woman').length
  const men = registrations.filter(r => r.iam === 'man').length
  const topCity = registrations.length
    ? Object.entries(
        registrations.reduce((acc, r) => { acc[r.city || 'Unknown'] = (acc[r.city || 'Unknown'] || 0) + 1; return acc }, {})
      ).sort((a, b) => b[1] - a[1])[0]
    : null

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const thisWeek = registrations.filter(r => r.createdAt && new Date(r.createdAt) > oneWeekAgo).length

  // Filtered list
  const filtered = registrations.filter((r) => {
    const q = search.toLowerCase()
    const matchSearch = !q || r.name?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || r.city?.toLowerCase().includes(q)
    const matchCity = cityFilter === 'All Cities' || r.city === cityFilter
    const matchGender = genderFilter === 'All' || r.iam === genderFilter
    const matchIntent = intentFilter === 'All' || r.intent === intentFilter
    return matchSearch && matchCity && matchGender && matchIntent
  })

  const hasFilters = search || cityFilter !== 'All Cities' || genderFilter !== 'All' || intentFilter !== 'All'

  return (
    <div className="min-h-screen bg-[#0D0B14] text-white font-sans">
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-40 bg-[#0D0B14]/95 backdrop-blur-md border-b border-white/[0.07] px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-rose flex items-center justify-center">
            <span className="font-display italic font-black text-white text-xs leading-none">O</span>
          </div>
          <span className="font-semibold text-white text-[15px]">ONE</span>
          <span className="text-white/20 text-sm">/</span>
          <span className="text-white/40 text-sm">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/30 text-xs hidden sm:block truncate max-w-[180px]">{user?.email}</span>
          <button
            onClick={handleSignOut}
            className="text-xs text-white/40 hover:text-white border border-white/10 hover:border-white/25 px-3 py-1.5 rounded-lg transition-all"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* ── Dev mode banner ── */}
      {isDevMode && (
        <div className="bg-amber-500/[0.08] border-b border-amber-500/15 px-4 py-2 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
          <p className="text-amber-400/80 text-[11px]">
            Dev mode · <span className="font-mono">{DEV_EMAIL}</span> · showing {registrations.length === SEED.length && !localStorage.getItem('one-registrations') ? 'seed' : 'localStorage'} data
          </p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Page title ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display italic font-black text-2xl text-white leading-none mb-1.5">
              Early Access Registrations
            </h1>
            <p className="text-white/30 text-sm">
              {loading ? 'Loading…' : `${total} registered · ${filtered.length} shown`}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={fetchData}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white border border-white/10 hover:border-white/25 px-3.5 py-2 rounded-lg transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button
              onClick={handleExport}
              disabled={exporting || total === 0}
              className="flex items-center gap-1.5 text-xs bg-rose hover:bg-rose-dark text-white px-3.5 py-2 rounded-lg transition-colors disabled:opacity-40"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {exporting ? 'Exporting…' : 'Export CSV'}
            </button>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          <StatCard label="Total" value={total} accent />
          <StatCard label="Women" value={women} sub={total ? `${Math.round(women / total * 100)}%` : '—'} />
          <StatCard label="Men" value={men} sub={total ? `${Math.round(men / total * 100)}%` : '—'} />
          <StatCard label="Top City" value={topCity?.[0] ?? '—'} sub={topCity ? `${topCity[1]} registrations` : undefined} />
          <StatCard label="This Week" value={thisWeek} sub="last 7 days" />
        </div>

        {/* ── Filters + view toggle ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, city…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 focus:border-rose/50 text-white placeholder-white/25 text-sm outline-none transition-colors font-sans"
            />
          </div>

          {/* City */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 focus:border-rose/50 text-white/70 text-sm outline-none transition-colors font-sans appearance-none cursor-pointer min-w-[130px]"
          >
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Gender */}
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 focus:border-rose/50 text-white/70 text-sm outline-none transition-colors font-sans appearance-none cursor-pointer min-w-[110px]"
          >
            {GENDERS.map(g => <option key={g} value={g}>{g === 'All' ? 'All Genders' : g}</option>)}
          </select>

          {/* Intent */}
          <select
            value={intentFilter}
            onChange={(e) => setIntentFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 focus:border-rose/50 text-white/70 text-sm outline-none transition-colors font-sans appearance-none cursor-pointer min-w-[160px]"
          >
            {INTENTS.map(i => <option key={i} value={i}>{i === 'All' ? 'All Intents' : i}</option>)}
          </select>

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={() => { setSearch(''); setCityFilter('All Cities'); setGenderFilter('All'); setIntentFilter('All') }}
              className="text-xs text-white/30 hover:text-white px-3 py-2.5 rounded-xl border border-white/10 hover:border-white/20 transition-all whitespace-nowrap"
            >
              Clear filters
            </button>
          )}

          {/* View toggle */}
          <div className="flex items-center bg-white/[0.05] border border-white/10 rounded-xl p-1 gap-1 ml-auto flex-shrink-0">
            <button
              onClick={() => setView('cards')}
              aria-label="Card view"
              className={`p-1.5 rounded-lg transition-colors ${view === 'cards' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
              </svg>
            </button>
            <button
              onClick={() => setView('table')}
              aria-label="Table view"
              className={`p-1.5 rounded-lg transition-colors ${view === 'table' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'}`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div role="alert" className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-5 py-4 mb-6 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchData} className="text-red-400 underline text-xs">Retry</button>
          </div>
        )}

        {/* ── Content ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-rose border-t-transparent animate-spin" />
            <p className="text-white/30 text-sm">Loading registrations…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 gap-3 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-white/40 font-medium">{hasFilters ? 'No users match your filters.' : 'No registrations yet.'}</p>
            {hasFilters && (
              <button onClick={() => { setSearch(''); setCityFilter('All Cities'); setGenderFilter('All'); setIntentFilter('All') }} className="text-rose text-sm hover:underline">
                Clear filters
              </button>
            )}
          </div>
        ) : view === 'cards' ? (
          /* ── Card grid ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((reg, i) => (
              <UserCard key={reg.id ?? i} user={reg} onClick={setSelected} />
            ))}
          </div>
        ) : (
          /* ── Table view ── */
          <div className="overflow-x-auto rounded-2xl border border-white/[0.07]">
            <table className="w-full text-sm" aria-label="Registrations table">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                  {['User', 'I am', 'Looking for', 'Age', 'City', 'Intent', 'Registered'].map(h => (
                    <th key={h} scope="col" className="px-4 py-3.5 text-left text-[10px] font-bold text-white/30 tracking-[0.1em] uppercase whitespace-nowrap first:pl-5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr
                    key={row.id ?? i}
                    onClick={() => setSelected(row)}
                    className="border-b border-white/[0.04] hover:bg-white/[0.04] transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3.5 pl-5">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={row.name} size="sm" />
                        <div className="min-w-0">
                          <p className="text-white font-medium text-[13px] truncate">{row.name || '—'}</p>
                          <p className="text-white/30 text-[11px] truncate">{row.email || '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge text={row.iam || '—'} cls={IAM_BADGE[row.iam] || 'bg-white/10 text-white/40'} />
                    </td>
                    <td className="px-4 py-3.5 text-white/50 capitalize text-[12px]">{row.lookingFor || '—'}</td>
                    <td className="px-4 py-3.5 text-white/50 text-[12px]">{row.age || '—'}</td>
                    <td className="px-4 py-3.5 text-white/50 text-[12px] whitespace-nowrap">{row.city || '—'}</td>
                    <td className="px-4 py-3.5">
                      {row.intent ? (
                        <Badge text={row.intent} cls={INTENT_BADGE[row.intent] || 'bg-white/10 text-white/40 border-white/10'} />
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3.5 text-white/30 text-[11px] whitespace-nowrap">
                      {row.createdAt ? new Date(row.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── User detail panel ── */}
      {selected && <UserDetailPanel user={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
