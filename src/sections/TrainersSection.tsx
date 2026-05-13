'use client'

import { useTranslations } from 'next-intl'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TrainerCard } from '@/components/cards/TrainerCard'

/**
 * TrainersSection Component
 * 
 * Showcases the gym's expert trainers.
 * Displays a grid of TrainerCard components with their specialties and bios.
 * 
 * Features:
 * - Internationalization for all trainer data and section text.
 * - Scroll reveal animation for the trainers grid.
 * - Responsive layout.
 * 
 * @returns {JSX.Element} The rendered Trainers section.
 */
export function TrainersSection() {
  const t = useTranslations('Trainers')
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.15 })

  // Trainer keys used in i18n
  const trainerKeys = ['adam', 'lina', 'omar'] as const

  // Static images mapping for trainers
  const trainerImages: Record<string, string> = {
    adam: '/images/trainer-1.jpg',
    lina: '/images/trainer-2.jpg',
    omar: '/images/trainer-3.jpg',
  }

  return (
    <section id="trainers" className="space-section">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {trainerKeys.map((key) => (
            <div key={key} data-reveal>
              <TrainerCard
                image={trainerImages[key]}
                name={t(`items.${key}.name`)}
                specialty={t(`items.${key}.specialty`)}
                bio={t(`items.${key}.bio`)}
                experience={t(`items.${key}.experience`)}
                rating={key === 'omar' ? '5.0' : '4.9'} // Assuming static ratings from initial data
                viewScheduleText={t('viewSchedule')}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
