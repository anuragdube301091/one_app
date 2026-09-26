import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Only initialise Firebase when a real API key is present.
// Without one the app falls back to dev auth (devAuth.js) automatically.
const isConfigured = Boolean(firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith('your_'))

let app = null
let auth = null

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
  } catch {
    app = null
    auth = null
  }
}

export { auth }
export default app
