'use client'

/**
 * Trial CTA Section component.
 * Features a lead generation form for booking a free trial session.
 * Optimized for conversions with clear value propositions and social proof.
 */

import { useState } from 'react'
import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FormInput } from '@/components/ui/FormInput'

export function TrialCTASection() {
  const t = useTranslations('HomePage.trial')
  
  /**
   * Scroll reveals for the two main columns.
   */
  const leftRef = useScrollReveal<HTMLDivElement>({ y: 30, x: -30, duration: 0.9 })
  const rightRef = useScrollReveal<HTMLDivElement>({ y: 30, x: 30, duration: 0.9, delay: 0.15 })
  
  const [submitted, setSubmitted] = useState(false)

  /**
   * Training goal options for the select input.
   */
  const GOALS = [
    { value: 'muscle', label: t('goals.muscle') },
    { value: 'fat', label: t('goals.fat') },
    { value: 'fitness', label: t('goals.fitness') },
    { value: 'coaching', label: t('goals.coaching') },
    { value: 'unsure', label: t('goals.unsure') },
  ]

  /**
   * Preferred time options for the select input.
   */
  const TIMES = [
    { value: 'morning', label: t('times.morning') },
    { value: 'afternoon', label: t('times.afternoon') },
    { value: 'evening', label: t('times.evening') },
  ]

  /**
   * Highlighted features list.
   */
  const FEATURES = [
    t('features.feature1'),
    t('features.feature2'),
    t('features.feature3')
  ]

  /**
   * Handle form submission to show the success state.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to an API
    setSubmitted(true)
  }

  return (
    <section id="trial" className="space-section bg-pf-bg">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column - Information & Value Props */}
          <div ref={leftRef}>
            <SectionHeader
              eyebrow={t('eyebrow')}
              heading={t('heading')}
            />
            <p className="text-lg text-pf-muted leading-relaxed mt-4 max-w-[440px]">
              {t('description')}
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              {FEATURES.map((item) => (
                <div key={item} className="flex items-center gap-2 text-caption text-pf-muted">
                  <Check size={14} className="text-pf-success" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Interactive Form */}
          <div ref={rightRef}>
            <div className="bg-pf-surface border border-pf-border rounded-pf-md p-8 shadow-xl">
              {submitted ? (
                /* Success State */
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-pf-success/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
                    <Check size={32} className="text-pf-success" />
                  </div>
                  <h3 className="text-subsection text-pf-text">{t('success.title')}</h3>
                  <p className="text-pf-muted mt-2">{t('success.description')}</p>
                </div>
              ) : (
                /* Form State */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <FormInput label={t('form.fullName')} placeholder="John Doe" required />
                  <FormInput label={t('form.email')} type="email" placeholder="john@example.com" required />
                  <FormInput label={t('form.phone')} type="tel" placeholder="+1 (555) 000-0000" />
                  <FormInput label={t('form.goal')} as="select" options={GOALS} required />
                  <FormInput label={t('form.date')} type="date" required />
                  <FormInput label={t('form.time')} as="select" options={TIMES} required />
                  <FormInput label={t('form.notes')} as="textarea" placeholder={t('form.notesPlaceholder')} />

                  <button
                    type="submit"
                    className="w-full h-[52px] bg-pf-accent text-white rounded-full font-semibold text-sm uppercase tracking-wide hover:bg-pf-accent-hover hover:scale-[1.01] transition-all duration-300 mt-2 active:scale-[0.98]"
                  >
                    {t('form.submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
