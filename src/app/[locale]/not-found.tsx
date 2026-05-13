'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Compass } from 'lucide-react'

/**
 * 404 Not Found page - fully internationalized with improved design.
 */
export default function NotFound() {
  const t = useTranslations('Errors.notFound')
  const commonT = useTranslations('Common')

  return (
    <AuthLayout
      image="/images/facility-1.jpg"
      quote="The only bad workout is the one that didn't happen."
      attribution="— Unknown"
    >
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* 404 visual */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-pf-surface border border-pf-border flex items-center justify-center">
            <Compass size={24} className="text-pf-accent" />
          </div>
          <span className="font-display text-6xl font-bold text-pf-border select-none">404</span>
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

        <Link
          href="/"
          className="inline-flex items-center justify-center h-14 px-10 bg-pf-accent text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-pf-accent-hover transition-all duration-300 shadow-lg active:scale-95"
        >
          {commonT('backToHome')}
        </Link>
      </div>
    </AuthLayout>
  )
}
