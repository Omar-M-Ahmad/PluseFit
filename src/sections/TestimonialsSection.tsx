'use client'

import { useTranslations } from 'next-intl'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TestimonialCard } from '@/components/cards/TestimonialCard'

/**
 * TestimonialsSection Component
 * 
 * Displays a section with social proof and member feedback.
 * 
 * Features:
 * - Internationalization for all testimonial quotes, names, and goals.
 * - Responsive grid layout.
 * - Scroll reveal animations.
 * 
 * @returns {JSX.Element} The rendered Testimonials section.
 */
export function TestimonialsSection() {
  const t = useTranslations('Testimonials')
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.12 })

  const testimonialKeys = ['maya', 'daniel', 'priya'] as const

  // Static name mapping for initials/avatars
  const testimonialNames: Record<string, string> = {
    maya: 'Maya R.',
    daniel: 'Daniel K.',
    priya: 'Priya S.',
  }

  return (
    <section className="bg-pf-surface space-section">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonialKeys.map((key) => (
            <div key={key} data-reveal>
              <TestimonialCard
                quote={t(`items.${key}.quote`)}
                name={testimonialNames[key]}
                goal={t(`items.${key}.goal`)}
                rating={5}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
