import RegistrationForm from './RegistrationForm.jsx'

const FEATURES = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Verified Profiles',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    label: 'Meaningful Matches',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    label: 'Private & Safe',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12z" />
      </svg>
    ),
    label: 'Thoughtful Gifting',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    label: '5 Intentional Swipes',
  },
]

const AVATARS = [
  { initials: 'R', bg: 'from-rose to-rose-dark' },
  { initials: 'S', bg: 'from-purple-500 to-purple-800' },
  { initials: 'A', bg: 'from-coral to-orange-600' },
  { initials: 'P', bg: 'from-pink-400 to-rose' },
]

export default function HeroSection() {
  return (
    <section className="bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — Headline + context */}
          <div className="animate-slide-up">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-rose bg-rose-light mb-6">
              <span className="w-1.5 h-1.5 bg-rose rounded-full animate-pulse-dot" />
              <span className="text-xs font-semibold tracking-wider uppercase text-rose">
                Coming Soon · Advance Registration Open
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-text-primary mb-5" style={{ fontSize: 'clamp(44px, 5.5vw, 72px)', lineHeight: 1.02, letterSpacing: '-0.025em' }}>
              5 Swipes.{' '}
              <span className="block italic text-rose">One Right Person.</span>
            </h1>

            <p className="section-body max-w-md mb-8" style={{ fontSize: '16px' }}>
              India's most intentional dating app for meaningful, verified connections — not endless swiping into the void.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {FEATURES.map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream border border-border-rose text-text-mid text-xs font-medium"
                >
                  <span className="text-rose">{icon}</span>
                  {label}
                </span>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {AVATARS.map(({ initials, bg }) => (
                  <div
                    key={initials}
                    className={`w-9 h-9 rounded-full bg-gradient-to-br ${bg} border-2 border-white flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                    aria-hidden="true"
                  >
                    {initials}
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full bg-cream border-2 border-white flex items-center justify-center text-text-muted text-[10px] font-semibold flex-shrink-0">
                  +4K
                </div>
              </div>
              <div className="text-sm text-text-mid leading-snug">
                <span className="font-semibold text-text-primary block">4,000+ ambitious singles</span>
                waiting for something real — across India
              </div>
            </div>
          </div>

          {/* Right — Registration form */}
          <div id="register" className="animate-fade-in">
            <div className="bg-white rounded-3xl border border-border-rose shadow-lg shadow-rose/5 p-8">
              <h2 className="font-display text-xl font-bold text-text-primary mb-1">
                Be the first to experience ONE
              </h2>
              <p className="text-sm text-text-muted mb-6">
                Advance registration for early access{' '}
                <span className="text-rose" aria-hidden="true">♡</span>
              </p>
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
