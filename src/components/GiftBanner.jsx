import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

export default function GiftBanner() {
  const { t } = useLang()
  const g = t.gift
  const ref = useScrollReveal()

  return (
    <section className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="reveal rounded-3xl bg-cream border border-border-rose overflow-hidden"
        >
          {/* Main content row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-6 sm:px-10 py-8">

            {/* Left — text */}
            <div className="flex items-center gap-5 min-w-0">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-rose-light flex items-center justify-center">
                <svg className="w-7 h-7 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-bold text-text-primary text-xl leading-tight">
                  {g.title}
                </h3>
                <p className="text-text-muted text-sm mt-1">{g.subtitle}</p>
              </div>
            </div>

            {/* Right — illustration */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Speech bubble */}
              <div className="relative">
                <div className="bg-white border border-border-rose rounded-2xl px-4 py-2.5 shadow-sm">
                  <p className="text-text-primary text-sm font-medium whitespace-nowrap">Such a nice surprise!! 🎉</p>
                </div>
                <div
                  aria-hidden="true"
                  className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white border-r border-b border-border-rose"
                  style={{ transform: 'rotate(45deg)' }}
                />
              </div>

              {/* Avatar */}
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-muted to-rose flex-shrink-0 border-2 border-white shadow-md flex items-center justify-center">
                <span className="font-display italic text-white font-bold text-base">A</span>
              </div>

              {/* Gift box */}
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-light to-rose-muted rounded-2xl flex items-center justify-center border border-border-rose">
                  <svg className="w-7 h-7 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v10H4V12M20 7H4a1 1 0 00-1 1v2a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1zM12 22V7m0 0a2 2 0 112-2 2 2 0 01-2 2zm0 0a2 2 0 11-2-2 2 2 0 012 2z" />
                  </svg>
                </div>
                {[['top-0 -right-1', '14px'], ['-top-1 right-3', '10px'], ['top-1 -left-1', '10px']].map(([pos, size], i) => (
                  <span key={i} aria-hidden="true" className={`absolute ${pos} text-coral`} style={{ fontSize: size }}>✦</span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border-rose bg-white/60 px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-text-muted">{g.partners}</p>
            <Link
              to="/explore-gifts"
              className="inline-flex items-center gap-2 text-rose text-sm font-semibold group"
            >
              {g.explore}
              <span className="w-7 h-7 rounded-full bg-rose-light flex items-center justify-center group-hover:bg-rose transition-colors duration-200">
                <svg className="w-3.5 h-3.5 text-rose group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
