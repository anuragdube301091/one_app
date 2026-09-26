import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { submitEarlyAccess } from '../lib/api.js'
import { useLang } from '../context/LanguageContext.jsx'

const CITY_OPTIONS = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat',
]

function SuccessState({ title, body }) {
  return (
    <div className="flex flex-col items-center text-center py-6 gap-5 animate-fade-in">
      {/* Animated checkmark */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-rose-light flex items-center justify-center">
          <svg className="w-10 h-10 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" className="animate-draw-check" />
          </svg>
        </div>
        {/* Sparkle ring */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <span
            key={deg}
            aria-hidden="true"
            className="absolute text-coral text-xs"
            style={{
              top: '50%', left: '50%',
              transform: `rotate(${deg}deg) translateY(-38px) translateX(-50%)`,
            }}
          >✦</span>
        ))}
      </div>

      <div>
        <h3 className="font-display font-black text-text-primary text-2xl italic mb-2">
          {title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed max-w-xs">
          {body}
        </p>
      </div>

      {/* Heartbeat line */}
      <div className="flex items-center gap-1 text-rose/40">
        {[4, 6, 12, 6, 4, 8, 4].map((h, i) => (
          <div key={i} className="w-1 bg-rose rounded-full" style={{ height: `${h}px` }} />
        ))}
      </div>

      <p className="text-xs text-text-muted">
        Share ONE with friends who deserve something real.
      </p>
    </div>
  )
}

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false)
  const { t } = useLang()
  const f = t.form

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(data) {
    try {
      // Try the backend API first
      await submitEarlyAccess(data)
    } catch {
      // Backend not yet live — save locally so the UX still works
      try {
        const existing = JSON.parse(localStorage.getItem('one-registrations') || '[]')
        existing.push({ ...data, createdAt: new Date().toISOString() })
        localStorage.setItem('one-registrations', JSON.stringify(existing))
      } catch {}
    }
    toast.success(f.successTitle)
    setSubmitted(true)
    reset()
  }

  if (submitted) {
    return <SuccessState title={f.successTitle} body={f.successBody} />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3.5">
      {/* Full Name */}
      <div>
        <label htmlFor="reg-name" className="sr-only">{f.fullName}</label>
        <input
          id="reg-name"
          type="text"
          placeholder={f.fullName}
          autoComplete="name"
          className={`input-rose ${errors.name ? 'border-error' : ''}`}
          {...register('name', { required: 'Full name is required' })}
        />
        {errors.name && <p role="alert" className="text-error text-xs mt-1">{errors.name.message}</p>}
      </div>

      {/* Phone */}
      <div className="flex gap-2">
        <select
          className="select-rose w-[80px] flex-shrink-0"
          aria-label="Country code"
          {...register('countryCode')}
        >
          <option value="+91">+91</option>
          <option value="+1">+1</option>
          <option value="+44">+44</option>
          <option value="+971">+971</option>
        </select>
        <div className="flex-1">
          <label htmlFor="reg-phone" className="sr-only">{f.phone}</label>
          <input
            id="reg-phone"
            type="tel"
            placeholder={f.phone}
            autoComplete="tel-national"
            className={`input-rose ${errors.phone ? 'border-error' : ''}`}
            {...register('phone', {
              required: 'Mobile number is required',
              pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit number' },
            })}
          />
        </div>
      </div>
      {errors.phone && <p role="alert" className="text-error text-xs -mt-2">{errors.phone.message}</p>}

      {/* Email */}
      <div>
        <label htmlFor="reg-email" className="sr-only">{f.email}</label>
        <input
          id="reg-email"
          type="email"
          placeholder={f.email}
          autoComplete="email"
          className={`input-rose ${errors.email ? 'border-error' : ''}`}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
          })}
        />
        {errors.email && <p role="alert" className="text-error text-xs mt-1">{errors.email.message}</p>}
      </div>

      {/* I am / Looking for */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="reg-iam" className="sr-only">{f.iAm}</label>
          <select id="reg-iam" className="select-rose" {...register('iam', { required: true })}>
            <option value="">{f.iAm}</option>
            {Object.entries(f.iAmOptions).map(([v, label]) => <option key={v} value={v}>{label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="reg-looking" className="sr-only">{f.lookingFor}</label>
          <select id="reg-looking" className="select-rose" {...register('lookingFor', { required: true })}>
            <option value="">{f.lookingFor}</option>
            {Object.entries(f.lookingOptions).map(([v, label]) => <option key={v} value={v}>{label}</option>)}
          </select>
        </div>
      </div>

      {/* Age / City */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="reg-age" className="sr-only">{f.age}</label>
          <select id="reg-age" className="select-rose" {...register('age', { required: true })}>
            <option value="">{f.age}</option>
            {Object.entries(f.ageOptions).map(([v, label]) => <option key={v} value={v}>{label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="reg-city" className="sr-only">{f.city}</label>
          <select id="reg-city" className="select-rose" {...register('city', { required: true })}>
            <option value="">{f.city}</option>
            {CITY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Intent */}
      <div>
        <label htmlFor="reg-intent" className="sr-only">{f.intent}</label>
        <select id="reg-intent" className="select-rose" {...register('intent', { required: true })}>
          <option value="">{f.intent}</option>
          {f.intentOptions.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-rose py-3.5 text-[15px] flex items-center justify-center gap-2 mt-1"
      >
        {isSubmitting ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <>
            {f.submit}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>

      <p className="text-center text-xs text-text-muted flex items-center justify-center gap-1.5">
        <svg className="w-3 h-3 text-rose flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        {f.security}
      </p>
    </form>
  )
}
