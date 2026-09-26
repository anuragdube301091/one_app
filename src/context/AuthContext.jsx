import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../lib/firebase.js'
import { getDevUser, devLogin, devLogout } from '../lib/devAuth.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getDevUser()) // surface dev session instantly
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      // Firebase not configured — dev auth only
      setLoading(false)
      return
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } else {
        setUser(getDevUser() ?? null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  // Must go through here rather than devLogin directly, so the new session
  // reaches React state — otherwise ProtectedRoute still sees a null user.
  function loginDev(email, password) {
    if (!devLogin(email, password)) return false
    setUser(getDevUser())
    return true
  }

  async function logout() {
    devLogout()
    if (auth?.currentUser) {
      try { await signOut(auth) } catch {}
    }
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginDev, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
