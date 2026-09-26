// API layer — all data operations go through the backend.
// Direct Firestore writes from the client are intentionally avoided
// to keep security rules simple and server-side validation central.

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || `Request failed: ${res.status}`)
  }

  return res.json()
}

// ── Public endpoints ──────────────────────────────────────────────────────────

/**
 * Submit an early-access registration.
 * @param {object} data  Form fields from the registration form.
 */
export async function submitEarlyAccess(data) {
  return request('/api/early-access', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// ── Admin endpoints (require Firebase ID token) ───────────────────────────────

/**
 * Fetch all early-access registrations.
 * @param {string} idToken  Firebase ID token from the signed-in admin user.
 */
export async function getRegistrations(idToken) {
  return request('/api/admin/registrations', {
    headers: { Authorization: `Bearer ${idToken}` },
  })
}

/**
 * Export registrations as CSV.
 * @param {string} idToken  Firebase ID token.
 */
export async function exportRegistrationsCSV(idToken) {
  const res = await fetch(`${API_BASE}/api/admin/registrations/export`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
  if (!res.ok) throw new Error('Export failed')
  return res.blob()
}
