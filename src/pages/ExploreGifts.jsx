import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { useLang } from '../context/LanguageContext.jsx'

const GIFT_CATEGORIES = [
  {
    id: 'flowers',
    emoji: '🌹',
    name: 'Fresh Flowers',
    desc: 'Roses, sunflowers, premium bouquets — same-day delivery across India.',
    color: 'from-[#FCE7EF] to-[#F9C8DB]',
    accent: 'bg-rose-light',
    textAccent: 'text-rose',
    items: ['Single Red Rose', 'Premium Rose Bouquet', 'Sunflower Bundle', 'Mixed Seasonal'],
  },
  {
    id: 'food',
    emoji: '🍫',
    name: 'Treats & Sweets',
    desc: 'Artisan chocolates, dessert boxes, and curated sweet hampers.',
    color: 'from-[#FDE8D8] to-[#F9C8A8]',
    accent: 'bg-coral/10',
    textAccent: 'text-coral',
    items: ['Belgian Chocolates', 'Macaron Box', 'Truffle Collection', 'Sweet Hamper'],
  },
  {
    id: 'experiences',
    emoji: '✨',
    name: 'Experiences',
    desc: 'Spa vouchers, dining credits, movie nights, and adventure passes.',
    color: 'from-[#E8D5F0] to-[#D4B8E8]',
    accent: 'bg-purple-50',
    textAccent: 'text-purple-600',
    items: ['Spa Voucher', 'Candle-lit Dinner', 'Movie Night', 'Weekend Escape'],
  },
  {
    id: 'personalized',
    emoji: '💌',
    name: 'Personalized',
    desc: 'Custom photo prints, heartfelt cards, and bespoke gift sets.',
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
  return (
    <div ref={ref} className="reveal">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
        {[
          { num: '01', title: 'Match on ONE', body: 'Both of you swipe right. The connection is real and verified.' },
          { num: '02', title: 'Choose a Gift', body: "Browse the catalogue and pick something that matches their vibe." },
          { num: '03', title: 'Private Delivery', body: "We deliver it to their door. Your match's address stays private." },
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
              <span className="text-xs font-semibold text-rose tracking-wide uppercase">Gift Shop</span>
              <span className="text-rose">·</span>
              <span className="text-xs text-text-muted">Coming with the app</span>
            </div>

            <h1
              className="font-display font-black text-text-primary leading-none mb-5 text-balance"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}
            >
              Say it with a{' '}
              <span className="italic text-rose">gift.</span>
            </h1>
            <p className="text-text-mid text-lg font-light leading-relaxed mb-8 max-w-xl mx-auto">
              After matching on ONE, send a thoughtful gift — flowers, chocolates, experiences — delivered privately to their door.
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a href="#categories" className="btn-rose px-7 py-3.5 text-[15px]">
                Explore Gifts
              </a>
            </div>
          </div>
        </section>

        {/* Gift categories */}
        <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <p className="section-eyebrow justify-center mb-3">Gift Categories</p>
              <h2 className="section-title mb-4">
                Choose what{' '}
                <span className="italic text-rose">feels right.</span>
              </h2>
              <p className="section-body max-w-lg mx-auto">
                Every gift ships with a personalized note from you, and the recipient's address stays fully private.
              </p>
            </div>

            <div
              ref={cardsRef}
              className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {GIFT_CATEGORIES.map(({ id, emoji, name, desc, color, textAccent, items }) => (
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
                      <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted">Coming Soon</span>
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
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-2">
              <p className="section-eyebrow justify-center mb-3">How It Works</p>
              <h2 className="section-title mb-4">
                Private.{' '}
                <span className="italic text-rose">Thoughtful.</span>{' '}
                Delivered.
              </h2>
              <p className="section-body max-w-lg mx-auto">
                Your match never shares their address. We handle the logistics — you just pick the gift.
              </p>
            </div>
            <HowGiftsWork />
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div ref={partnersRef} className="reveal max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-text-muted mb-8">
              Delivery Partners
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
              Ready to find your match?
            </h2>
            <p className="text-white/50 text-sm mb-8 leading-relaxed">
              Join the waitlist and be the first to experience ONE — the app where gifts make connections real.
            </p>
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo(0, 0)
                setTimeout(() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' }), 100)
              }}
              className="inline-block bg-rose text-white font-semibold rounded-xl px-8 py-4 text-[15px] hover:bg-rose-dark transition-colors"
            >
              Get Early Access →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
