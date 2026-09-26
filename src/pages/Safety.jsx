import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const PILLARS = [
  {
    title: '100% Profile Verification',
    body: 'Every member completes a multi-step process — government ID upload, live video selfie match, and social cross-check. No exceptions.',
    bg: 'bg-rose-light',
    color: 'text-rose',
  },
  {
    title: 'AI-Powered Fake Detection',
    body: 'Our detection system continuously scans for suspicious behaviour, fake photos, and bot patterns — removing threats before they reach you.',
    bg: 'bg-cream',
    color: 'text-coral',
  },
  {
    title: 'Report & Block Anytime',
    body: 'One tap to report or block. Our safety team reviews every report within 24 hours and acts decisively.',
    bg: 'bg-rose-light',
    color: 'text-rose',
  },
  {
    title: '24/7 Safety Support',
    body: 'Our support team is available around the clock. If something feels wrong, help is always one message away.',
    bg: 'bg-cream',
    color: 'text-coral',
  },
  {
    title: 'Strict Community Guidelines',
    body: "A zero-tolerance policy for harassment, explicit content, and disrespectful behaviour. ONE is a respectful space — or you don't belong here.",
    bg: 'bg-rose-light',
    color: 'text-rose',
  },
  {
    title: 'Private Gifting Delivery',
    body: "When you send a gift, your match's address is never shared. Delivery is handled directly by our partners — your privacy is absolute.",
    bg: 'bg-cream',
    color: 'text-coral',
  },
]

export default function Safety() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white border-b border-border-rose py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="section-eyebrow justify-center mb-4">Your Safety, Our Priority</p>
            <h1 className="section-title mb-5" style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
              Verified. Safe.
              <span className="italic text-rose block">Respectful.</span>
            </h1>
            <p className="section-body text-base max-w-xl mx-auto">
              {"Safety isn't a feature on ONE — it's the foundation. Every decision we make starts with one question: does this protect our members?"}
            </p>
          </div>
        </section>

        {/* Safety pillars */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PILLARS.map(({ title, body, bg, color }) => (
                <div key={title} className="bg-white border border-border-rose rounded-2xl p-6 hover:border-rose hover:-translate-y-1 transition-all duration-200">
                  <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center ${color} mb-5`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-text-primary text-lg mb-3">{title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety tips */}
        <section className="bg-white py-14 px-4 sm:px-6 lg:px-8 border-t border-border-rose">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mb-10">
              Safety tips for
              <span className="italic text-rose"> every date.</span>
            </h2>
            <ul className="space-y-4 list-none m-0 p-0">
              {[
                'Meet in a public place for your first few dates.',
                'Let a trusted friend know where you\'re going and who you\'re meeting.',
                'Never share your home address before you feel fully comfortable.',
                'Trust your instincts — if something feels off, leave.',
                'Report any behaviour that makes you uncomfortable using the in-app Report button.',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-4 bg-ivory border border-border-rose rounded-xl px-5 py-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-rose-light text-rose text-sm font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-text-mid text-sm leading-relaxed">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
