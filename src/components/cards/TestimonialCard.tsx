'use client'

/**
 * Testimonial Card component.
 * Displays a client's feedback, name, goal, and star rating.
 */

import { Star } from 'lucide-react'

interface TestimonialCardProps {
  quote: string
  name: string
  goal: string
  rating?: number
}

export function TestimonialCard({ quote, name, goal, rating = 5 }: TestimonialCardProps) {
  /**
   * Extract initials from the client's name for the avatar placeholder.
   */
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bg-pf-elevated border border-pf-border rounded-pf-md p-8 h-full flex flex-col">
      {/* Decorative quote mark */}
      <div className="text-5xl font-display text-pf-accent/30 leading-none rtl:text-right">&ldquo;</div>
      
      {/* The actual testimonial text */}
      <p className="text-base leading-relaxed text-pf-text mt-2 flex-1 italic">
        {quote}
      </p>

      {/* Client Identity Information */}
      <div className="flex items-center gap-3 mt-6">
        <div className="w-10 h-10 rounded-full bg-pf-surface flex items-center justify-center text-pf-accent font-display font-semibold text-sm border border-pf-border">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-pf-text">{name}</p>
          <p className="text-caption text-pf-muted">{goal}</p>
        </div>
      </div>

      {/* Star Rating Display */}
      <div className="flex items-center gap-1 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'text-pf-energy fill-pf-energy' : 'text-pf-muted/30'}
          />
        ))}
      </div>
    </div>
  )
}
