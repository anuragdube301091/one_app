import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { devLogin, DEV_EMAIL, DEV_PASSWORD } from '../../lib/devAuth.js'

// Firebase error codes that mean "not connected / not configured"
const FIREBASE_CONFIG_ERRORS = new Set([
  'auth/invalid-api-key',
  'auth/network-request-failed',
  'auth/configuration-not-found',
  'auth/app-not-authorized',
  'auth/internal-error',
])

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showDevHint, setShowDevHint] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (user) navigate('/admin/dashboard', { replace: true })
  }, [user, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      const code = err.code ?? ''

      if (FIREBASE_CONFIG_ERRORS.has(code)) {
        // Firebase not reachable — try dev fallback
        if (devLogin(email, password)) {
          navigate('/admin/dashboard', { replace: true })
          return
        }
        setError('Invalid credentials.')
      } else if (
        code === 'auth/wrong-password' ||
        code === 'auth/user-not-found' ||
        code === 'auth/invalid-credential'
      ) {
        // Firebase connected but wrong password — still allow dev fallback
        if (devLogin(email, password)) {
          navigate('/admin/dashboard', { replace: true })
          return
        }
        setError('Invalid email or password.')
      } else if (code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Try again later.')
      } else {
        // Unknown error — try dev fallback before giving up
        if (devLogin(email, password)) {
          navigate('/admin/dashboard', { replace: true })
          return
        }
        setError('Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-text-primary flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="font-display italic font-black text-3xl text-white mb-1">ONE</div>
          <p className="text-white/40 text-xs tracking-widest uppercase">Admin Access</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h1 className="font-display font-bold text-white text-xl italic mb-6">Sign in</h1>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="admin-email" className="block text-xs font-medium text-white/50 mb-1.5">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/30 text-sm outline-none focus:border-rose transition-colors font-sans"
                placeholder="admin@one.dev"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-medium text-white/50 mb-1.5">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/30 text-sm outline-none focus:border-rose transition-colors font-sans"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div role="alert" className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2.5">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-rose text-white font-semibold py-3 rounded-lg text-sm hover:bg-rose-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <span className="loading loading-spinner loading-sm" /> : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Dev credentials hint */}
        <div className="mt-4">
          <button
            onClick={() => setShowDevHint(!showDevHint)}
            className="w-full text-center text-white/20 hover:text-white/40 text-xs transition-colors py-1"
          >
            {showDevHint ? 'Hide' : 'Dev mode credentials'}
          </button>

          {showDevHint && (
            <div className="mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 space-y-2">
              <p className="text-[10px] font-bold tracking-widest uppercase text-coral mb-2">
                Dev / Local fallback
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs">Email</span>
                <button
                  onClick={() => setEmail(DEV_EMAIL)}
                  className="text-white/70 text-xs font-mono hover:text-white transition-colors"
                >
                  {DEV_EMAIL}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs">Password</span>
                <button
                  onClick={() => setPassword(DEV_PASSWORD)}
                  className="text-white/70 text-xs font-mono hover:text-white transition-colors"
                >
                  {DEV_PASSWORD}
                </button>
              </div>
              <p className="text-white/20 text-[10px] pt-1 border-t border-white/10">
                Click values above to auto-fill. Only works when Firebase is not configured.
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-white/20 text-xs mt-4">
          This page is not publicly linked. Admin access only.
        </p>
      </div>
    </div>
  )
}
