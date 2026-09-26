import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { useLang } from '../context/LanguageContext.jsx'

const GIFT_CATEGORIES = [
  {
    id: 'flowers',
    emoji: '🌹',
    key: 'flowers',
    color: 'from-[#FCE7EF] to-[#F9C8DB]',
    accent: 'bg-rose-light',
    textAccent: 'text-rose',
    items: ['Single Red Rose', 'Premium Rose Bouquet', 'Sunflower Bundle', 'Mixed Seasonal'],
  },
  {
    id: 'food',
    emoji: '🍫',
    key: 'food',
    color: 'from-[#FDE8D8] to-[#F9C8A8]',
    accent: 'bg-coral/10',
    textAccent: 'text-coral',
    items: ['Belgian Chocolates', 'Macaron Box', 'Truffle Collection', 'Sweet Hamper'],
  },
  {
    id: 'experiences',
    emoji: '✨',
    key: 'experiences',
    color: 'from-[#E8D5F0] to-[#D4B8E8]',
    accent: 'bg-purple-50',
    textAccent: 'text-purple-600',
    items: ['Spa Voucher', 'Candle-lit Dinner', 'Movie Night', 'Weekend Escape'],
  },
  {
    id: 'personalized',
    emoji: '💌',
    key: 'personalized',
    color: 'from-[#FFF0C8] to-[#FFE099]',
    accent: 'bg-amber-50',
    textAccent: 'text-amber-600',
    items: ['Photo Print', 'Handwritten Card', 'Gift Box', 'Memory Book'],
  },
]

const PARTNERS = [
  { name: 'Flora 2000', category: 'Flowers', icon: '🌸' },
  { name: 'Blinkit', category: 'Quick Delivery', icon: '⚡' },
  { name: 'Swiggy', category: 'Food & More', icon: '🛵' },
  { name: 'Zomato', category: 'Dining', icon: '🍽️' },
]

function HowGiftsWork() {
  const ref = useScrollReveal()
  const { t } = useLang()
  return (
    <div ref={ref} className="reveal">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
        {[
          ...t.gifts.howSteps.map((s, i) => ({ num: String(i + 1).padStart(2, '0'), ...s })),
        ].map(({ num, title, body }) => (
          <div key={num} className="bg-ivory border border-border-rose rounded-2xl p-6 text-center">
            <div className="font-display italic font-black text-5xl text-rose-light leading-none mb-3 select-none">
              {num}
            </div>
            <h4 className="font-display font-bold text-text-primary text-base mb-2">{title}</h4>
            <p className="text-text-muted text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ExploreGifts() {
  const heroRef = useScrollReveal()
  const cardsRef = useScrollReveal({ threshold: 0.05 })
  const partnersRef = useScrollReveal()
  const { t } = useLang()
  const navigate = useNavigate()

  function goToEarlyAccess() {
    navigate('/')
    // Home must mount before #register exists
    setTimeout(() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' }), 150)
  }

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-ivory via-cream to-rose-light/30 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div aria-hidden="true" className="absolute top-0 right-0 w-80 h-80 rounded-full bg-rose-light blur-3xl opacity-40 -translate-y-20 translate-x-20 pointer-events-none" />
          <div aria-hidden="true" className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-coral/10 blur-3xl pointer-events-none" />

          <div ref={heroRef} className="reveal max-w-3xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 bg-white border border-border-rose rounded-full px-4 py-2 mb-6">
              <span className="text-xs font-semibold text-rose tracking-wide uppercase">{t.gifts.badge}</span>
              <span className="text-rose">·</span>
              <span className="text-xs text-text-muted">{t.gifts.badgeSub}</span>
            </div>

            <h1
              className="font-display font-black text-text-primary leading-none mb-5 text-balance"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}
            >
              {t.gifts.title}{' '}
              <span className="italic text-rose">{t.gifts.titleItalic}</span>
            </h1>
            <p className="text-text-mid text-lg font-light leading-relaxed mb-8 max-w-xl mx-auto">
              {t.gifts.subtext}
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a href="#categories" className="btn-rose px-7 py-3.5 text-[15px]">
                {t.gifts.cta}
              </a>
            </div>
          </div>
        </section>

        {/* Gift categories */}
        <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="section-eyebrow justify-center mb-3">{t.gifts.categoriesEyebrow}</p>
              <h2 className="section-title mb-4">
                {t.gifts.categoriesTitle}{' '}
                <span className="italic text-rose">{t.gifts.categoriesTitleItalic}</span>
              </h2>
              <p className="section-body max-w-lg mx-auto">
                {t.gifts.categoriesBody}
              </p>
            </div>

            <div
              ref={cardsRef}
              className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {GIFT_CATEGORIES.map(({ id, key, emoji, color, textAccent, items }) => {
                const name = t.gifts[key]
                const desc = t.gifts[`${key}Desc`]
                return (
                <div
                  key={id}
                  className="group relative rounded-3xl overflow-hidden border border-border-rose bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Gradient header */}
                  <div className={`h-36 bg-gradient-to-br ${color} flex items-center justify-center relative`}>
                    <span className="text-6xl drop-shadow-sm select-none" role="img" aria-label={name}>
                      {emoji}
                    </span>
                    {/* Coming soon ribbon */}
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm border border-white rounded-full px-3 py-1">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted">{t.gifts.comingSoon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className={`font-display font-bold text-xl mb-2 ${textAccent}`}>{name}</h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-4">{desc}</p>

                    {/* Sample items */}
                    <ul className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="text-[11px] font-medium text-text-mid bg-ivory border border-border-rose rounded-full px-3 py-1"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-2">
              <p className="section-eyebrow justify-center mb-3">{t.gifts.howEyebrow}</p>
              <h2 className="section-title mb-4">
                {t.gifts.howTitle}{' '}
                <span className="italic text-rose">{t.gifts.howTitleItalic}</span>{' '}
                {t.gifts.howTitleSuffix}
              </h2>
              <p className="section-body max-w-lg mx-auto">
                {t.gifts.howBody}
              </p>
            </div>
            <HowGiftsWork />
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div ref={partnersRef} className="reveal max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-text-muted mb-8">
              {t.gifts.partnersLabel}
            </p>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {PARTNERS.map(({ name, category, icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-3 bg-ivory border border-border-rose rounded-2xl px-5 py-3.5 min-w-[140px]"
                >
                  <span className="text-2xl" role="img" aria-label={name}>{icon}</span>
                  <div className="text-left">
                    <p className="font-semibold text-text-primary text-[13px] leading-tight">{name}</p>
                    <p className="text-text-muted text-[10px]">{category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-text-primary py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display font-black text-white text-3xl italic mb-4">
              {t.gifts.ctaTitle}
            </h2>
            <p className="text-white/50 text-sm mb-8 leading-relaxed">
              {t.gifts.ctaBody}
            </p>
            <button
              onClick={goToEarlyAccess}
              className="inline-block bg-rose text-white font-semibold rounded-xl px-8 py-4 text-[15px] hover:bg-rose-dark transition-colors"
            >
              {t.gifts.ctaButton} →
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
