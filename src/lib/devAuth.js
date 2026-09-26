// Dev-only fallback auth — used when Firebase is not yet configured.
// These credentials are intentionally visible; they only grant access to
// the local dev dashboard and have no power over any real Firebase project.

export const DEV_EMAIL = 'admin@one.dev'
export const DEV_PASSWORD = 'one@admin123'

const KEY = 'one-dev-admin'

export function devLogin(email, password) {
  if (email.trim() === DEV_EMAIL && password === DEV_PASSWORD) {
    try { sessionStorage.setItem(KEY, '1') } catch {}
    return true
  }
  return false
}

export function devLogout() {
  try { sessionStorage.removeItem(KEY) } catch {}
}

export function getDevUser() {
  try {
    if (sessionStorage.getItem(KEY)) {
      return { email: DEV_EMAIL, displayName: 'Dev Admin', isDev: true }
    }
  } catch {}
  return null
}
