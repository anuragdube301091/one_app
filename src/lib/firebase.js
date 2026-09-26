import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Firebase SDK values are public identifiers — safe in client bundles.
// When not configured, auth falls back to devAuth.js automatically.
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY

let app = null
let auth = null

// Only initialise if a real key is present (not empty / placeholder)
if (apiKey && apiKey.length > 10 && !apiKey.startsWith('your_')) {
  try {
    app = initializeApp({
      apiKey,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    })
    auth = getAuth(app)
  } catch (e) {
    // Silently fall through — AdminLogin handles missing auth via devAuth.js
    app = null
    auth = null
  }
}

export { auth }
export default app
