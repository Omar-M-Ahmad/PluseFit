'use client'

/**
 * Ticker Section component.
 * Displays a high-impact scrolling text banner to create visual energy.
 */

import { useTranslations } from 'next-intl'

export function TickerSection() {
  const t = useTranslations('Common')
  
  /**
   * The text is repeated multiple times to ensure a continuous scrolling effect.
   */
  const text = t('ticker')
  const duplicated = text.repeat(4)

  return (
    <section className="bg-pf-accent h-[40vh] md:h-[50vh] flex items-center overflow-hidden border-y border-white/5">
      <div className="animate-marquee whitespace-nowrap">
        <span className="font-display text-[clamp(4rem,12vw,10rem)] font-bold text-white/10 select-none">
          {duplicated}
        </span>
      </div>
    </section>
  )
}
