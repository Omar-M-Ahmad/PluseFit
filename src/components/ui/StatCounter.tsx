'use client'

import { useCountUp } from '@/hooks/useCountUp'

interface StatCounterProps {
  end: number
  suffix?: string
  prefix?: string
  label: string
}

export function StatCounter({ end, suffix = '', prefix = '', label }: StatCounterProps) {
  const { ref, displayValue } = useCountUp({ end, suffix, prefix })

  return (
    <div className="text-center">
      <span ref={ref} className="text-stat text-pf-text block">
        {displayValue}
      </span>
      <span className="text-caption text-pf-muted mt-2 block">{label}</span>
    </div>
  )
}
