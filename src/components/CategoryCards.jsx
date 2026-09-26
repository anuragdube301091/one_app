import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import { useLang } from '../context/LanguageContext.jsx'

const CATEGORIES = [
  {
    to: '/dating',
    key: 'dating',
    bg: 'from-[#F9C8DB] via-[#F4A8C0] to-[#E8809A]',
    iconBg: 'bg-rose',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    to: '/travel-buddy',
    key: 'travelBuddy',
    bg: 'from-[#B5D8FF] via-[#7CB9F0] to-[#4A9ED8]',
    iconBg: 'bg-coral',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
  {
    to: '/party-buddy',
    key: 'partyBuddy',
    bg: 'from-[#E8C8F0] via-[#D4A8E8] to-[#B880D0]',
    iconBg: 'bg-coral',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
]

export default function CategoryCards() {
  const gridRef = useRef(null)
  const { t } = useLang()

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('revealed')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); observer.disconnect() } },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-ivory py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="section-eyebrow mb-3">{t.categories.eyebrow}</p>
            <h2 className="section-title">
              {t.categories.title}
              <span className="italic text-rose block">{t.categories.titleItalic}</span>
            </h2>
          </div>
          <p className="section-body max-w-xs text-right hidden sm:block">
            {t.categories.aside}
          </p>
        </div>

        <div ref={gridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-3 gap-5">
          {CATEGORIES.map(({ to, key, bg, iconBg, icon }) => {
            const label = t.categories[key]
            const description = t.categories[`${key}Desc`]
            return (
            <Link
              key={to}
              to={to}
              className="group relative rounded-3xl overflow-hidden block focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
              aria-label={`Explore ${label}`}
            >
              {/* Photo area */}
              <div
                className={`w-full aspect-[4/3] bg-gradient-to-br ${bg} transition-transform duration-500 group-hover:scale-105`}
                role="img"
                aria-label={`${label} category photo`}
              />

              {/* White wave overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-white"
                style={{ height: '42%', borderRadius: '50% 50% 0 0 / 30px 30px 0 0' }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center mb-3 shadow-md`}>
                  {icon}
                </div>
                <h3 className="font-display font-bold text-text-primary text-lg leading-tight mb-1">
                  {label}
                </h3>
                <p className="text-text-muted text-xs leading-relaxed mb-3 hidden sm:block">
                  {description}
                </p>
                <div className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
