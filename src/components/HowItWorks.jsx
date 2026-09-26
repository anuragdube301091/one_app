import { useRef, useEffect } from 'react'

const STEPS = [
  {
    num: '01',
    title: 'Create & Verify',
    body: 'Build your profile and complete video verification. Every member you meet is exactly who they say they are.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Choose Your Interests',
    body: 'Pick from 20+ lifestyle categories — travel, cuisine, cinema, fitness, conversations. Your interests shape your five daily matches.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: '5 Intentional Swipes',
    body: 'Five curated profiles a day — not a bottomless feed. Every swipe gets your full attention, the way it should be.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Connect & Gift',
    body: 'Match, start real conversations, and express interest with thoughtful gifts delivered privately to their door.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12z" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const gridRef = useRef(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('revealed')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); observer.disconnect() } },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-eyebrow justify-center mb-3">How ONE Works</p>
          <h2 className="section-title mb-4">
            Intentional by design.
            <span className="italic text-rose block">Meaningful by choice.</span>
          </h2>
          <p className="section-body max-w-xl mx-auto">
            We built ONE around a simple conviction: less choice leads to better choices. Every feature serves one goal — helping you find the right person.
          </p>
        </div>

        <div ref={gridRef} className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ num, title, body, icon }, i) => (
            <div key={num} className="relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute top-10 left-full w-full h-px bg-border-rose z-0"
                  style={{ width: 'calc(100% - 80px)', left: '80px' }}
                />
              )}

              <div className="relative bg-ivory border border-border-rose rounded-2xl p-6 hover:border-rose hover:-translate-y-1 transition-all duration-200 group h-full">
                <div className="font-display italic font-black text-5xl text-rose-light leading-none mb-4 select-none group-hover:text-rose-muted transition-colors">
                  {num}
                </div>
                <div className="w-12 h-12 rounded-xl bg-rose-light flex items-center justify-center text-rose mb-4 group-hover:bg-rose group-hover:text-white transition-all duration-200">
                  {icon}
                </div>
                <h3 className="font-display font-bold text-text-primary text-lg leading-tight mb-3">
                  {title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
