import { Check } from 'lucide-react'

/**
 * Props for the PricingCard component.
 */
interface PricingCardProps {
  /** The name of the membership plan. */
  name: string
  /** The price of the plan. */
  price: string
  /** The billing period (e.g., "/month"). */
  period?: string
  /** A brief description of who the plan is for. */
  description: string
  /** A list of features included in the plan. */
  features: string[]
  /** Whether the card should be visually highlighted as "most popular". */
  highlighted?: boolean
  /** The text to display on the call-to-action button. */
  ctaText?: string
  /** The label for the "most popular" badge. */
  mostPopularLabel?: string
}

/**
 * PricingCard Component
 * 
 * A detailed card showing membership pricing and features.
 * 
 * Features:
 * - Highlighted state for the recommended plan.
 * - RTL support for feature list and check icons.
 * - Responsive padding and font sizes.
 * - Hover elevation effect.
 * 
 * @param {PricingCardProps} props - The component props.
 * @returns {JSX.Element} The rendered pricing card.
 */
export function PricingCard({
  name,
  price,
  period = '/month',
  description,
  features,
  highlighted = false,
  ctaText = 'Get Started',
  mostPopularLabel = 'MOST POPULAR',
}: PricingCardProps) {
  return (
    <div
      className={`relative bg-pf-surface border rounded-pf-md p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 h-full flex flex-col ${
        highlighted
          ? 'border-2 border-pf-accent shadow-[0_0_40px_rgba(255,77,28,0.1)]'
          : 'border-pf-border hover:border-pf-accent/30'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
          <span className="bg-pf-accent text-white text-caption px-4 py-1.5 rounded-full">
            {mostPopularLabel}
          </span>
        </div>
      )}

      <h3 className="text-subsection text-pf-text">{name}</h3>
      <div className="flex items-baseline gap-1 mt-4">
        <span className="text-stat text-pf-text">{price}</span>
        <span className="text-base text-pf-muted">{period}</span>
      </div>
      <p className="text-sm text-pf-muted mt-2">{description}</p>

      <ul className="mt-6 space-y-3 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check size={16} className="text-pf-success mt-0.5 shrink-0" />
            <span className="text-sm text-pf-muted">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full mt-8 py-3.5 rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300 cursor-pointer ${
          highlighted
            ? 'bg-pf-accent text-white hover:bg-pf-accent-hover hover:scale-[1.02]'
            : 'bg-transparent text-pf-text border border-pf-border hover:border-pf-accent hover:text-pf-accent'
        }`}
      >
        {ctaText}
      </button>
    </div>
  )
}
