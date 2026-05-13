'use client'

/**
 * Sign Up Page - uses flat Auth i18n namespace.
 */

import { useState } from 'react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { FormInput } from '@/components/ui/FormInput'
import { AuthLayout } from '@/components/layout/AuthLayout'

export default function SignUpPage() {
  const t = useTranslations('Auth')
  const trialT = useTranslations('TrialCTA')

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', goal: '', password: '', confirmPassword: '',
  })

  const GOALS = [
    { value: 'muscle', label: trialT('goals.muscle') },
    { value: 'fat', label: trialT('goals.fat') },
    { value: 'fitness', label: trialT('goals.fitness') },
    { value: 'coaching', label: trialT('goals.coaching') },
    { value: 'unsure', label: trialT('goals.unsure') },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Registering:', formData)
  }

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <AuthLayout
      image="/images/signup.jpg"
      quote={t('quotes.signup')}
      attribution={t('quotes.attributionSignup')}
    >
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-section text-pf-text">{t('startJourney')}</h1>
        <p className="text-base text-pf-muted mt-3 leading-relaxed">{t('signUpDesc')}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <FormInput label="Full Name" placeholder="John Doe" value={formData.name} onChange={(e) => updateField('name', e.target.value)} required />
          <FormInput label="Email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => updateField('email', e.target.value)} required />
          <FormInput label="Phone (optional)" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} />
          <FormInput label="Fitness Goal" as="select" options={GOALS} value={formData.goal} onChange={(e) => updateField('goal', e.target.value)} required />
          <FormInput label="Password" type="password" placeholder="Create a password" value={formData.password} onChange={(e) => updateField('password', e.target.value)} required />
          <FormInput label="Confirm Password" type="password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={(e) => updateField('confirmPassword', e.target.value)} required />

          <button type="submit" className="w-full h-[52px] bg-pf-accent text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-pf-accent-hover transition-all duration-300 shadow-lg active:scale-95">
            {t('createAccount')}
          </button>
        </form>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-pf-border" />
          <span className="text-caption text-pf-muted uppercase font-bold tracking-widest text-[10px]">{t('or')}</span>
          <div className="flex-1 h-px bg-pf-border" />
        </div>

        <button className="w-full h-12 bg-pf-surface border border-pf-border rounded-full flex items-center justify-center gap-3 text-sm text-pf-text font-semibold hover:border-pf-accent hover:bg-pf-elevated transition-all duration-300 active:scale-95">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
          {t('googleContinue')}
        </button>

        <p className="text-sm text-pf-muted text-center mt-8">
          {t('alreadyHaveAccount')}{' '}
          <Link href="/signin" className="text-pf-accent font-bold hover:underline">
            {t('signIn')}
          </Link>
        </p>

        <p className="text-caption text-pf-muted/60 text-center mt-6 leading-relaxed">
          {t('privacyNote')}
        </p>
      </div>
    </AuthLayout>
  )
}
