'use client'

import { useTranslations } from 'next-intl'

/**
 * Global loading state - PulseFit branded with i18n support.
 */
export default function Loading() {
  const t = useTranslations('Common')

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-pf-bg z-50">
      {/* Animated logo */}
      <div className="relative mb-8">
        {/* Outer pulse ring */}
        <div className="absolute inset-0 w-20 h-20 rounded-full border border-pf-accent/20 animate-ping" />
        {/* Middle ring */}
        <div className="absolute inset-1 w-18 h-18 rounded-full border border-pf-accent/10 animate-pulse" />
        {/* Center icon */}
        <div className="relative w-20 h-20 rounded-full bg-pf-surface border border-pf-border flex items-center justify-center shadow-glass">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-pf-accent">
            <path d="M4 6h4M4 12h4M4 18h4M20 6h-4M20 12h-4M20 18h-4M8 6v12M16 6v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Brand name */}
      <span className="font-display text-xl font-bold text-pf-text tracking-widest mb-3">
        PULSEFIT
      </span>

      {/* Loading indicator */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-pf-accent animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}
