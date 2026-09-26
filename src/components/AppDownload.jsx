import { useLang } from '../context/LanguageContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const AppleIcon = () => (
  <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
)

const PlayIcon = () => (
  <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3.18 23.76c.3.17.64.24.98.19L15.89 12 4.16.05c-.34-.05-.68.02-.98.19C2.57.61 2.25 1.31 2.25 2.1v19.8c0 .79.32 1.49.93 1.86z" />
    <path d="M19.4 9.1l-2.73-1.57L13.6 12l3.07 3.47 2.73-1.57c1.1-.64 1.1-2.16 0-2.8z" />
    <path d="M4.16.05l11.55 11.78-2.88 2.88L4.16.05z" opacity=".7" />
    <path d="M4.16 23.95L15.83 12.17 12.83 9.29 4.16 23.95z" opacity=".5" />
  </svg>
)

export default function AppDownload() {
  const { t } = useLang()
  const d = t.appDownload
  const textRef = useScrollReveal()
  const phoneRef = useScrollReveal({ threshold: 0.15 })

  return (
    <section className="bg-text-primary py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div aria-hidden="true" className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose opacity-[0.08] blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-coral opacity-[0.08] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20 justify-between">

          {/* ── Text column ── */}
          <div ref={textRef} className="reveal text-center lg:text-left max-w-lg">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-coral mb-5">
              {d.eyebrow}
            </p>
            <h2
              className="font-display font-black text-white leading-tight mb-5 text-balance"
              style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-0.02em' }}
            >
              {d.title}{' '}
              <span className="italic text-rose">{d.titleItalic}</span>{' '}
              {d.titleSuffix}
            </h2>
            <p className="text-white/50 text-[15px] font-light leading-relaxed mb-10">
              {d.body}
            </p>

            {/* ── Store buttons ── */}
            <div className="flex flex-row items-center justify-center lg:justify-start gap-4 flex-wrap">
              {/* App Store */}
              <div
                role="button"
                tabIndex={0}
                aria-label={`${d.appStore} — ${d.comingSoon}`}
                title={d.comingSoon}
                className="relative inline-flex items-center gap-3.5 bg-white/[0.08] hover:bg-white/[0.12] border border-white/20 text-white rounded-2xl px-5 py-3.5 cursor-not-allowed select-none transition-colors"
                style={{ minWidth: '180px' }}
              >
                <AppleIcon />
                <div className="text-left leading-none">
                  <p className="text-[10px] font-medium text-white/50 uppercase tracking-[0.1em] mb-1">
                    {d.appStorePrefix}
                  </p>
                  <p className="text-[17px] font-semibold tracking-tight">{d.appStore}</p>
                </div>
                <span className="absolute -top-2.5 -right-2.5 bg-coral text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
                  {d.comingSoon}
                </span>
              </div>

              {/* Google Play */}
              <div
                role="button"
                tabIndex={0}
                aria-label={`${d.googlePlay} — ${d.comingSoon}`}
                title={d.comingSoon}
                className="relative inline-flex items-center gap-3.5 bg-white/[0.08] hover:bg-white/[0.12] border border-white/20 text-white rounded-2xl px-5 py-3.5 cursor-not-allowed select-none transition-colors"
                style={{ minWidth: '180px' }}
              >
                <PlayIcon />
                <div className="text-left leading-none">
                  <p className="text-[10px] font-medium text-white/50 uppercase tracking-[0.1em] mb-1">
                    {d.googlePlayPrefix}
                  </p>
                  <p className="text-[17px] font-semibold tracking-tight">{d.googlePlay}</p>
                </div>
                <span className="absolute -top-2.5 -right-2.5 bg-coral text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
                  {d.comingSoon}
                </span>
              </div>
            </div>
          </div>

          {/* ── Phone illustration ── */}
          <div ref={phoneRef} className="reveal relative flex-shrink-0" style={{ '--reveal-delay': '150ms' }}>
            {/* Phone shell */}
            <div
              className="w-52 h-[370px] bg-white/[0.06] border border-white/20 rounded-[2.8rem] flex flex-col overflow-hidden shadow-2xl"
              aria-hidden="true"
            >
              {/* Notch */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-20 h-1.5 rounded-full bg-white/15" />
              </div>
              {/* Screen */}
              <div className="flex-1 bg-gradient-to-br from-rose-light via-cream to-ivory mx-2 mb-2 rounded-[2.2rem] flex flex-col items-center justify-center gap-3">
                <div className="font-display italic font-black text-4xl text-rose drop-shadow-sm">ONE</div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-rose animate-pulse-dot" />
                  <span className="text-text-muted text-[10px] font-semibold tracking-[0.14em] uppercase">Coming Soon</span>
                </div>
              </div>
              {/* Home bar */}
              <div className="flex justify-center pb-3">
                <div className="w-20 h-1.5 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Match notification */}
            <div className="absolute -right-10 top-14 bg-white rounded-2xl shadow-2xl p-3.5 border border-border-rose w-40 animate-float">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-muted to-rose flex items-center justify-center text-white text-xs font-bold">A</div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral to-orange-500 flex items-center justify-center text-white text-xs font-bold -ml-2.5 border-2 border-white">R</div>
              </div>
              <p className="text-text-primary text-[11px] font-semibold leading-tight">It's a Match!</p>
              <p className="text-text-muted text-[10px] mt-0.5 leading-snug">You and Ananya liked each other</p>
            </div>

            {/* Compatibility score */}
            <div className="absolute -left-10 bottom-20 bg-white rounded-2xl shadow-xl p-3 border border-border-rose animate-float" style={{ animationDelay: '0.4s' }}>
              <p className="text-[9px] font-semibold tracking-widest uppercase text-coral mb-0.5">Match</p>
              <p className="font-display italic font-black text-rose text-2xl leading-none">92%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
