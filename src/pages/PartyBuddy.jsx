import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'

const PERKS = [
  { title: 'Event-Based Matching', body: 'Going to a concert, festival, or club night? Find someone to go with — then see if it turns into something more.' },
  { title: 'Social Scene Filters', body: 'Rooftop bars, live music, stand-up comedy, house parties — filter by the scenes you love most.' },
  { title: 'City-Based Discovery', body: "See who's going out in your city this weekend and send a \"going too?\" nudge." },
  { title: 'Safe Socials', body: 'All party buddies are verified. Share your plans, check in, and party with confidence.' },
]

export default function PartyBuddy() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#E8C8F0] via-[#C890D8] to-[#9B45C0] py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-5">Party Buddy</p>
            <h1 className="font-display font-black text-white italic leading-tight mb-5 text-balance" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.025em' }}>
              Never go out<br />alone again.
            </h1>
            <p className="text-white/80 text-base font-light leading-relaxed max-w-lg mx-auto mb-8">
              Find someone who loves the same social scene. From Bollywood nights to jazz cafés — connect with a verified party buddy who matches your energy.
            </p>
            <Link to="/" className="bg-white text-[#9B45C0] font-bold px-8 py-3.5 rounded-xl inline-block hover:bg-opacity-90 transition-all shadow-lg">
              Join the Waitlist →
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="section-title text-center mb-10">
              Your social life,
              <span className="italic text-rose"> elevated.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PERKS.map(({ title, body }) => (
                <div key={title} className="bg-white border border-border-rose rounded-2xl p-6 hover:border-rose transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
