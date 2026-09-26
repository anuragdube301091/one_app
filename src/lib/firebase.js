import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Firebase SDK config — these values are public identifiers
// (not secrets). They are safe to ship in client-side code.
// Access is controlled entirely by Firebase Security Rules on the backend.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

// Auth is used only for admin authentication.
// The admin Firebase user must be created manually in the Firebase Console.
export const auth = getAuth(app)

export default app
