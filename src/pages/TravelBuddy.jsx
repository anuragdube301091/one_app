import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'

const PERKS = [
  { title: 'Destination Matching', body: "Tell ONE where you want to go. We'll find members planning the same trip so you can explore together." },
  { title: 'Travel Style Filters', body: 'Backpacker, luxury traveller, weekend explorer — filter by travel style so your adventure partner matches your vibe.' },
  { title: 'Verified Companions', body: 'Every travel buddy is verified. Your safety on the road starts here.' },
  { title: 'Trip Chat', body: 'Plan your trip directly in the app — share itineraries, costs, and expectations before you commit.' },
]

export default function TravelBuddy() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#B5D8FF] via-[#7CB9F0] to-[#4A9ED8] py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-5">Travel Buddy</p>
            <h1 className="font-display font-black text-white italic leading-tight mb-5 text-balance" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.025em' }}>
              Find your perfect<br />travel companion.
            </h1>
            <p className="text-white/80 text-base font-light leading-relaxed max-w-lg mx-auto mb-8">
              Explore the world with someone who shares your wanderlust. From Goa weekends to Himalayan treks — find a verified travel buddy who moves at your pace.
            </p>
            <Link to="/" className="bg-white text-[#3B7FBF] font-bold px-8 py-3.5 rounded-xl inline-block hover:bg-opacity-90 transition-all shadow-lg">
              Join the Waitlist →
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="section-title text-center mb-10">
              Travel better,{' '}
              <span className="italic text-rose">together.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PERKS.map(({ title, body }) => (
                <div key={title} className="bg-white border border-border-rose rounded-2xl p-6 hover:border-rose transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] flex items-center justify-center text-[#3B7FBF] mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-text-primary text-lg mb-2">{title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
