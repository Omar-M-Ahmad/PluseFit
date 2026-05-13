interface SectionHeaderProps {
  eyebrow: string
  heading: string
  subtext?: string
  centered?: boolean
  light?: boolean
}

export function SectionHeader({ eyebrow, heading, subtext, centered = false, light = false }: SectionHeaderProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <span className="text-caption text-pf-accent block mb-3">{eyebrow}</span>
      <h2 className="text-section text-pf-text">{heading}</h2>
      {subtext && (
        <p
          className={`mt-3 text-base leading-relaxed max-w-xl ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-white/70' : 'text-pf-muted'}`}
        >
          {subtext}
        </p>
      )}
    </div>
  )
}
