import type { LucideIcon } from 'lucide-react'

/**
 * Props for the BenefitCard component.
 */
interface BenefitCardProps {
  /** The icon to display at the top of the card. */
  icon: LucideIcon
  /** The title of the benefit. */
  title: string
  /** A detailed description of the benefit. */
  description: string
}

/**
 * BenefitCard Component
 * 
 * A card that showcases a specific benefit or feature with an icon, title, and description.
 * 
 * Features:
 * - Hover effects including vertical translation and border color change.
 * - Icon container with subtle background.
 * - Responsive and accessible design.
 * 
 * @param {BenefitCardProps} props - The component props.
 * @returns {JSX.Element} The rendered card.
 */
export function BenefitCard({ icon: Icon, title, description }: BenefitCardProps) {
  return (
    <div className="bg-pf-elevated border border-pf-border rounded-pf-md p-8 transition-all duration-400 hover:-translate-y-1 hover:border-pf-accent/30 group h-full">
      <div className="w-12 h-12 rounded-pf-sm bg-pf-accent/10 flex items-center justify-center">
        <Icon size={24} className="text-pf-accent" />
      </div>
      <h3 className="text-subsection text-pf-text mt-5">{title}</h3>
      <p className="text-sm text-pf-muted mt-2 leading-relaxed">{description}</p>
    </div>
  )
}
