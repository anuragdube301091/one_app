import { createContext, useContext, useState } from 'react'
import { translations } from '../i18n/translations.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('one-lang') || 'en' } catch { return 'en' }
  })

  function switchLang(code) {
    setLang(code)
    try { localStorage.setItem('one-lang', code) } catch {}
  }

  // Fallback chain: exact code → base language → 'en'
  const t = translations[lang] ?? translations[lang.split('-')[0]] ?? translations.en

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
