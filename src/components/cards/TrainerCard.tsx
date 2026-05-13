import { ArrowRight } from 'lucide-react'
import { useLocale } from 'next-intl'

/**
 * Props for the TrainerCard component.
 */
interface TrainerCardProps {
  /** URL of the trainer's image. */
  image: string
  /** Full name of the trainer. */
  name: string
  /** Area of expertise (e.g., Strength, HIIT). */
  specialty: string
  /** Short biography of the trainer. */
  bio: string
  /** Years of experience. */
  experience: string
  /** Average rating out of 5.0. */
  rating: string
  /** Translated text for the "View Schedule" link. */
  viewScheduleText?: string
}

/**
 * TrainerCard Component
 * 
 * Displays a trainer's profile including image, bio, and experience.
 * 
 * Features:
 * - Image zoom effect on hover.
 * - RTL support for animations (e.g., arrow movement).
 * - Styled for high-end professional fitness aesthetic.
 * 
 * @param {TrainerCardProps} props - The component props.
 * @returns {JSX.Element} The rendered trainer card.
 */
export function TrainerCard({
  image,
  name,
  specialty,
  bio,
  experience,
  rating,
  viewScheduleText = 'View Schedule',
}: TrainerCardProps) {
  const locale = useLocale()
  const isRtl = locale === 'ar'

  return (
    <div className="group bg-pf-surface border border-pf-border rounded-pf-md overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-pf-accent/40 cursor-pointer h-full flex flex-col">
      <div className="aspect-[3/4] overflow-hidden shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-subsection text-pf-text">{name}</h3>
        <p className="text-caption text-pf-accent mt-1">{specialty}</p>
        <p className="text-sm text-pf-muted mt-2 line-clamp-2">{bio}</p>
        
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            <span className="text-caption text-pf-muted">{experience}</span>
            <span className="text-caption text-pf-energy">{rating} ★</span>
          </div>
          <div className="mt-4 flex items-center gap-1 text-pf-accent text-sm font-medium">
            {viewScheduleText}
            <ArrowRight
              size={16}
              className={`transition-transform duration-300 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
