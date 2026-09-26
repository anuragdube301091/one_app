import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'

const FEATURES = [
  {
    title: '100% Verified Profiles',
    body: 'Every profile goes through our multi-step verification — government ID, live selfie, and social check. No catfish, ever.',
    icon: '✓',
  },
  {
    title: '5 Curated Matches Daily',
    body: 'Our algorithm considers your interests, lifestyle, relationship goals, and location to serve exactly five profiles a day — chosen with care.',
    icon: '♡',
  },
  {
    title: 'Compatibility Scoring',
    body: 'Each match comes with a compatibility percentage based on shared values, interests, and intent. Know before you swipe.',
    icon: '%',
  },
  {
    title: 'AI-Powered Fake Detection',
    body: 'Continuous monitoring flags suspicious activity and fake accounts before they reach you.',
    icon: '✦',
  },
  {
    title: 'Advanced Filters (Premium)',
    body: 'Filter by education, profession, hometown, family values, diet preference, and more.',
    icon: '≡',
  },
  {
    title: 'Thoughtful Gifting',
    body: 'Send roses, premium bouquets, or curated experiences after a match. Gestures that make introductions memorable.',
    icon: '⊕',
  },
]

export default function Dating() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white border-b border-border-rose py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-eyebrow mb-4">Dating on ONE</p>
              <h1 className="section-title text-[clamp(36px,5vw,64px)] mb-5">
                Find someone who
                <span className="italic text-rose block">actually fits.</span>
              </h1>
              <p className="section-body text-base mb-8 max-w-lg">
                Not someone who's close enough. Not someone you settled for. ONE is built around intention — five curated matches a day with people who share your values, lifestyle, and relationship goals.
              </p>
              <Link to="/" className="btn-rose inline-block px-7 py-3.5 text-base">
                Join the Waitlist →
              </Link>
            </div>
            {/* Illustration placeholder */}
            <div className="relative">
              <div className="w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-rose-light via-cream to-ivory flex items-center justify-center border border-border-rose">
                <div className="text-center">
                  <div className="font-display italic font-black text-6xl text-rose opacity-20 mb-2">♡</div>
                  <p className="text-text-muted text-sm">Dating illustration</p>
                </div>
              </div>
              {/* Match card overlay */}
              <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-lg p-4 border border-border-rose">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-muted to-rose flex items-center justify-center text-white font-bold">A</div>
                  <div>
                    <p className="text-text-primary text-sm font-semibold">Ananya, 27</p>
                    <p className="text-text-muted text-xs">Mumbai · 92% match</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title mb-3">Everything you need to
                <span className="italic text-rose"> find the one.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map(({ title, body, icon }) => (
                <div key={title} className="bg-white border border-border-rose rounded-2xl p-6 hover:border-rose hover:-translate-y-1 transition-all duration-200">
                  <div className="w-11 h-11 rounded-xl bg-rose-light flex items-center justify-center text-rose font-bold text-lg mb-5">
                    {icon}
                  </div>
                  <h3 className="font-display font-bold text-text-primary text-lg mb-2">{title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-rose py-14 px-4 text-center">
          <h2 className="font-display font-black text-white text-3xl italic mb-4">Ready to start?</h2>
          <p className="text-white/75 mb-7 max-w-md mx-auto">Join thousands of verified singles waiting for something real.</p>
          <Link to="/" className="bg-white text-rose font-bold px-8 py-3.5 rounded-xl inline-block hover:bg-cream transition-colors">
            Get Early Access →
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
