import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <div className="font-display italic font-black text-[120px] leading-none text-rose-light select-none mb-4">
            404
          </div>
          <h1 className="font-display font-black text-text-primary text-3xl italic mb-3">
            Page not found.
          </h1>
          <p className="text-text-muted mb-8 max-w-sm mx-auto">
            This page doesn't exist — but your person might be on ONE. Head back home.
          </p>
          <Link to="/" className="btn-rose inline-block px-7 py-3.5">
            Back to Home →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
