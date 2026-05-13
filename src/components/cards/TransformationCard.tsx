import { useLocale } from 'next-intl'

/**
 * Props for the TransformationCard component.
 */
interface TransformationCardProps {
  /** The name of the member. */
  name: string
  /** The fitness goal achieved. */
  goal: string
  /** The duration of the transformation. */
  duration: string
  /** The primary metric (e.g., weight lost, strength gained). */
  metric: string
  /** The label for the primary metric. */
  metricLabel: string
  /** A personal quote from the member. */
  quote: string
}

/**
 * TransformationCard Component
 * 
 * A card that displays a member's transformation success story, including
 * their name, goal, achieved metrics, and a personal quote.
 * 
 * Features:
 * - RTL support using logical CSS properties.
 * - Displays member initials as a placeholder avatar.
 * - Styled for the PulseFit aesthetic.
 * 
 * @param {TransformationCardProps} props - The component props.
 * @returns {JSX.Element} The rendered card.
 */
export function TransformationCard({
  name,
  goal,
  duration,
  metric,
  metricLabel,
  quote,
}: TransformationCardProps) {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const initials = name.split(' ').map((n) => n[0]).join('')

  return (
    <div className="bg-pf-surface border border-pf-border rounded-pf-md p-8 h-full flex flex-col">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-pf-elevated flex items-center justify-center text-pf-accent font-display font-semibold shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-base font-semibold text-pf-text">{name}</p>
          <p className="text-caption text-pf-muted">{goal}</p>
        </div>
      </div>

      <div className="mt-6">
        <span className="text-stat text-pf-energy">{metric}</span>
        <span className="text-caption text-pf-muted ms-2">{metricLabel}</span>
      </div>

      <blockquote className="mt-5 text-sm text-pf-muted italic border-s-2 border-pf-accent ps-4 leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <p className="text-caption text-pf-muted/60 mt-5">{duration}</p>
    </div>
  )
}
