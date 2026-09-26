import { useState, useRef, useEffect } from 'react'
import { useLang } from '../context/LanguageContext.jsx'

export const LANGUAGES = [
  { code: 'en-IN', label: 'English (India)', native: 'English (India)' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'en-US', label: 'English (United States)', native: 'English (United States)' },
  { code: 'en-GB', label: 'English (United Kingdom)', native: 'English (United Kingdom)' },
  { code: 'en-CA', label: 'English (Canada)', native: 'English (Canada)' },
  { code: 'en-AU', label: 'English (Australia)', native: 'English (Australia)' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'fr-CA', label: 'French (Canada)', native: 'Français (Canada)' },
  { code: 'es', label: 'Spanish (Spain)', native: 'Español (España)' },
  { code: 'es-MX', label: 'Spanish (Mexico)', native: 'Español (México)' },
  { code: 'it', label: 'Italian', native: 'Italiano' },
  { code: 'pt-BR', label: 'Portuguese (Brazil)', native: 'Português (Brasil)' },
  { code: 'ru', label: 'Russian', native: 'Русский' },
  { code: 'zh-CN', label: 'Chinese Simplified', native: '中文 (简体)' },
  { code: 'id', label: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'da', label: 'Danish', native: 'Dansk' },
]

const GlobeIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
)

const ChevronIcon = ({ open }) => (
  <svg
    className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 text-rose flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

export default function LanguageSwitcher({ compact = false }) {
  const { lang, switchLang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function handle(e) { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.label}`}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border-rose bg-white hover:bg-ivory text-text-mid hover:text-text-primary text-[12px] font-medium transition-colors duration-150 focus-visible:outline-rose"
      >
        <GlobeIcon />
        {!compact && (
          <span className="max-w-[90px] truncate">{current.native}</span>
        )}
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full mt-2 bg-white border border-border-rose rounded-2xl shadow-xl overflow-hidden z-50 animate-fade-in"
          style={{ width: '220px', maxHeight: '320px', overflowY: 'auto' }}
        >
          {LANGUAGES.map(({ code, native }) => {
            const isActive = lang === code
            return (
              <button
                key={code}
                role="option"
                aria-selected={isActive}
                onClick={() => { switchLang(code); setOpen(false) }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-[13px] text-left transition-colors duration-100 ${
                  isActive
                    ? 'bg-rose-light text-rose font-semibold'
                    : 'text-text-mid hover:bg-ivory hover:text-text-primary'
                }`}
              >
                <span>{native}</span>
                {isActive && <CheckIcon />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
