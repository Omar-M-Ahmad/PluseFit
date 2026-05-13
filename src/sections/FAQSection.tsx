'use client'

/**
 * FAQ Section component.
 * Addresses common client questions using an accessible accordion interface.
 * Helps reduce friction and builds trust with potential members.
 */

import { useTranslations } from 'next-intl'
import { SectionHeader } from '@/components/ui/SectionHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function FAQSection() {
  const t = useTranslations('HomePage.faq')
  const sectionRef = useScrollReveal<HTMLElement>({ y: 30 })

  /**
   * FAQ data structure extracted from translations.
   */
  const FAQS = [
    {
      question: t('items.q1.q'),
      answer: t('items.q1.a'),
    },
    {
      question: t('items.q2.q'),
      answer: t('items.q2.a'),
    },
    {
      question: t('items.q3.q'),
      answer: t('items.q3.a'),
    },
    {
      question: t('items.q4.q'),
      answer: t('items.q4.a'),
    },
  ]

  return (
    <section id="faq" ref={sectionRef} className="space-section bg-pf-surface">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          centered
        />

        {/* Accessible Accordion for FAQs */}
        <Accordion type="single" collapsible className="w-full mt-12 space-y-4">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-pf-border rounded-pf-md px-6 bg-pf-bg/50 overflow-hidden"
            >
              <AccordionTrigger className="text-left rtl:text-right font-display text-lg py-5 hover:text-pf-accent transition-colors hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-pf-muted leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
