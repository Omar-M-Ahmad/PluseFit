'use client'

/**
 * Program Card component.
 * Displays a single training program with an image, title, and metadata.
 */

import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ProgramCardProps {
  image: string
  title: string
  description: string
  difficulty: string
  duration: string
}

export function ProgramCard({ image, title, description, difficulty, duration }: ProgramCardProps) {
  const t = useTranslations('Common');

  return (
    <div className="group bg-pf-surface border border-pf-border rounded-pf-md overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-float cursor-pointer">
      {/* Program Image Container */}
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      {/* Content Container */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-caption bg-pf-accent/10 text-pf-accent px-3 py-1 rounded-full">
            {difficulty}
          </span>
          <span className="text-caption bg-pf-elevated text-pf-muted px-3 py-1 rounded-full">
            {duration}
          </span>
        </div>
        
        <h3 className="text-subsection text-pf-text">{title}</h3>
        <p className="text-sm text-pf-muted mt-2 line-clamp-2 leading-relaxed">
          {description}
        </p>
        
        {/* Call to action footer */}
        <div className="mt-4 flex items-center gap-1 text-pf-accent text-sm font-semibold uppercase tracking-wider">
          {t('viewProgram')}
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180"
          />
        </div>
      </div>
    </div>
  )
}
