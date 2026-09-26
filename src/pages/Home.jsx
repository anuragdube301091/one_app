import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import HeroSection from '../components/HeroSection.jsx'
import StatsBar from '../components/StatsBar.jsx'
import CategoryCards from '../components/CategoryCards.jsx'
import GiftBanner from '../components/GiftBanner.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import AppDownload from '../components/AppDownload.jsx'
import RegistrationForm from '../components/RegistrationForm.jsx'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsBar />
        <CategoryCards />
        <GiftBanner />
        <HowItWorks />
        <AppDownload />

        {/* Bottom CTA / secondary registration */}
        <section className="bg-ivory py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center mb-10">
            <p className="section-eyebrow justify-center mb-3">Limited Spots Available</p>
            <h2 className="section-title mb-4">
              Ready to find
              <span className="italic text-rose block">your person?</span>
            </h2>
            <p className="section-body">
              Thousands of verified singles are already on the waitlist. Secure your spot before we launch.
            </p>
          </div>
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-border-rose shadow-lg shadow-rose/5 p-8">
            <RegistrationForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
