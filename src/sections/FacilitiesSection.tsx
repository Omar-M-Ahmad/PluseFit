'use client'

import { useTranslations } from 'next-intl'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * FacilitiesSection Component
 * 
 * Showcases the gym's physical environment and specialized zones.
 * Displays a non-uniform grid of high-quality facility images.
 * 
 * Features:
 * - Internationalization for zone labels and section text.
 * - Masonry-style grid layout using Tailwind's row-span.
 * - Hover scale effects on images.
 * - Scroll reveal animations.
 * 
 * @returns {JSX.Element} The rendered Facilities section.
 */
export function FacilitiesSection() {
  const t = useTranslations('Facilities')
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.1, duration: 1 })

  const images = [
    { src: '/images/facility-1.jpg', label: t('zones.strength'), tall: true },
    { src: '/images/facility-2.jpg', label: t('zones.cardio'), tall: false },
    { src: '/images/facility-3.jpg', label: t('zones.recovery'), tall: false },
    { src: '/images/facility-4.jpg', label: t('zones.group'), tall: true },
  ]

  return (
    <section className="bg-pf-surface space-section">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 auto-rows-[200px] md:auto-rows-[240px]">
          {/* Left tall image */}
          <div data-reveal className="relative overflow-hidden rounded-pf-md md:row-span-2 group cursor-pointer">
            <img
              src={images[0].src}
              alt={images[0].label}
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 text-sm font-medium text-white rtl:left-auto rtl:right-5">
              {images[0].label}
            </span>
          </div>

          {/* Center top */}
          <div data-reveal className="relative overflow-hidden rounded-pf-md group cursor-pointer">
            <img
              src={images[1].src}
              alt={images[1].label}
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 text-sm font-medium text-white rtl:left-auto rtl:right-5">
              {images[1].label}
            </span>
          </div>

          {/* Right tall */}
          <div data-reveal className="relative overflow-hidden rounded-pf-md md:row-span-2 group cursor-pointer">
            <img
              src={images[3].src}
              alt={images[3].label}
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 text-sm font-medium text-white rtl:left-auto rtl:right-5">
              {images[3].label}
            </span>
          </div>

          {/* Center bottom */}
          <div data-reveal className="relative overflow-hidden rounded-pf-md group cursor-pointer">
            <img
              src={images[2].src}
              alt={images[2].label}
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 text-sm font-medium text-white rtl:left-auto rtl:right-5">
              {images[2].label}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
