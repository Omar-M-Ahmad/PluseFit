'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { AlertTriangle } from 'lucide-react'

/**
 * Global error boundary - fully internationalized.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('Errors.general')
  const commonT = useTranslations('Common')

  useEffect(() => {
    console.error('Unhandled Route Error:', error)
  }, [error])

  return (
    <AuthLayout
      image="/images/facility-2.jpg"
      quote="Every setback is a setup for a comeback."
      attribution="— PulseFit Support"
    >
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Error icon */}
        <div className="w-14 h-14 rounded-full bg-pf-accent/10 border border-pf-accent/20 flex items-center justify-center mb-6">
          <AlertTriangle size={24} className="text-pf-accent" />
        </div>

        <span className="text-pf-accent font-bold tracking-widest text-sm uppercase mb-3 block">
          {t('eyebrow')}
        </span>
        <h1 className="text-section text-pf-text mb-4">
          {t('title')}
        </h1>
        <p className="text-base text-pf-muted mb-10 leading-relaxed max-w-md">
          {t('description')}
        </p>

        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center h-14 px-10 bg-pf-accent text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-pf-accent-hover transition-all duration-300 shadow-lg active:scale-95"
        >
          {commonT('tryAgain')}
        </button>
      </div>
    </AuthLayout>
  )
}
