'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseCountUpOptions {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
}

export function useCountUp(options: UseCountUpOptions) {
  const { end, duration = 2, suffix = '', prefix = '', decimals = 0 } = options
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const proxy = { value: 0 }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          if (hasAnimated.current) return
          hasAnimated.current = true
          gsap.to(proxy, {
            value: end,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              const formatted =
                decimals > 0
                  ? proxy.value.toFixed(decimals)
                  : Math.round(proxy.value).toString()
              setDisplayValue(`${prefix}${formatted}${suffix}`)
            },
          })
        },
      })
    }, el)

    return () => ctx.revert()
  }, [end, duration, suffix, prefix, decimals])

  return { ref, displayValue }
}
