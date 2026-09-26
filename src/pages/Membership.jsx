import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'

const PLANS = [
  {
    name: 'Free',
    price: '₹0',
    period: 'Try the basics',
    features: ['5 Swipes / Day', 'Match & Chat', 'Basic Filters', 'Limited Visibility'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Premium',
    price: '₹599',
    period: 'per month',
    badge: 'Most Popular',
    features: [
      'Unlimited Likes',
      'See Who Liked You',
      'Advanced Filters',
      'Read Receipts',
      'Priority Support',
      'Ad-Free Experience',
      'Profile Boost (3× visibility)',
      'Advanced Compatibility Score',
      'Exclusive Events & Offers',
    ],
    cta: 'Go Premium',
    featured: true,
  },
  {
    name: 'Booster',
    price: '₹399',
    period: '50 extra swipes · one-time',
    features: ['50 Extra Swipes', 'More Profile Views', 'Higher Match Chance', 'One-time Purchase'],
    cta: 'Get Booster',
    featured: false,
  },
]

const PREMIUM_INCLUDES = [
  'Ad-free experience',
  'Profile Boost (3× visibility)',
  'Advanced compatibility score',
  'Exclusive events & offers',
  'Priority customer support',
]

export default function Membership() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white border-b border-border-rose py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="section-eyebrow justify-center mb-4">Choose Your Experience</p>
            <h1 className="section-title mb-4" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}>
              Premium features for people
              <span className="italic text-rose block">serious about love.</span>
            </h1>
            <p className="section-body max-w-lg mx-auto">
              ONE Free gives you a taste. ONE Premium removes every limit so you can focus entirely on finding the right person.
            </p>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              {PLANS.map(({ name, price, period, badge, features, cta, featured }) => (
                <div
                  key={name}
                  className={`relative rounded-2xl p-7 transition-all duration-200 ${
                    featured
                      ? 'bg-rose text-white shadow-xl shadow-rose/25 scale-[1.02]'
                      : 'bg-white border border-border-rose hover:border-rose'
                  }`}
                >
                  {badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-coral text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
                      {badge}
                    </div>
                  )}
                  <div className={`text-xs font-semibold tracking-widest uppercase mb-4 ${featured ? 'text-white/70' : 'text-text-muted'}`}>
                    {name}
                  </div>
                  <div className={`font-display font-black text-5xl leading-none mb-1 ${featured ? 'text-white' : 'text-text-primary'}`} style={{ letterSpacing: '-0.03em' }}>
                    {price}
                  </div>
                  <div className={`text-xs mb-6 ${featured ? 'text-white/60' : 'text-text-muted'}`}>{period}</div>

                  <ul className={`space-y-2.5 mb-7 list-none m-0 p-0 ${featured ? 'text-white/85' : 'text-text-mid'}`}>
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <span className={`text-base font-bold flex-shrink-0 ${featured ? 'text-white' : 'text-rose'}`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/"
                    className={`block text-center py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                      featured
                        ? 'bg-white text-rose hover:bg-cream'
                        : 'border-2 border-border-rose text-text-mid hover:border-rose hover:text-rose'
                    }`}
                  >
                    {cta} →
                  </Link>
                </div>
              ))}
            </div>

            {/* Premium includes note */}
            <div className="mt-10 bg-white border border-border-rose rounded-2xl p-6">
              <h3 className="font-display font-bold text-text-primary text-lg mb-4">Premium includes:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PREMIUM_INCLUDES.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-text-mid">
                    <span className="w-5 h-5 rounded-full bg-rose-light flex items-center justify-center text-rose text-xs font-bold flex-shrink-0">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-14 px-4 sm:px-6 lg:px-8 border-t border-border-rose">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mb-10">
              Common questions.
            </h2>
            <div className="space-y-4">
              {[
                { q: 'Can I cancel Premium anytime?', a: 'Yes — Premium is billed monthly and you can cancel at any time from your account settings. No lock-in, no questions asked.' },
                { q: 'What payment methods do you accept?', a: 'UPI, credit/debit cards, net banking, and all major wallets (PhonePe, GPay, Paytm).' },
                { q: 'Is Booster a subscription?', a: 'No. Booster is a one-time purchase of 50 extra swipes. You can buy it whenever you need a boost.' },
                { q: 'Do I need Premium to join the waitlist?', a: 'Not at all. The waitlist is free and open to everyone. You can decide on a plan once the app launches.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-ivory border border-border-rose rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-semibold text-text-primary text-[15px] gap-4">
                    {q}
                    <span className="flex-shrink-0 text-rose group-open:rotate-45 transition-transform duration-200 text-xl leading-none">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-text-muted leading-relaxed border-t border-border-rose pt-4">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
