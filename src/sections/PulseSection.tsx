'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { initKineticRipple, destroyKineticRipple, type KineticRippleState } from '@/webgl/kineticRipple'

/**
 * PulseSection Component
 * 
 * An interactive WebGL-powered section showcasing a featured product.
 * Features a kinetic ripple effect on a canvas background and floating product info.
 * 
 * Features:
 * - WebGL kinetic ripple effect that reacts to mouse movement.
 * - Internationalized product information and technical readouts.
 * - Responsive layout with technical details shown on larger screens.
 * 
 * @returns {JSX.Element} The rendered Pulse interactive section.
 */
export function PulseSection() {
  const t = useTranslations('Pulse')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<KineticRippleState | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const state = initKineticRipple(canvas)
    if (!state) return
    stateRef.current = state

    // Mouse tracking
    const wrapper = wrapperRef.current
    if (wrapper) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = wrapper.getBoundingClientRect()
        state.targetMouse.x = (e.clientX - rect.left) / rect.width
        state.targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height
      }
      const handleMouseLeave = () => {
        state.targetMouse.x = 0.5
        state.targetMouse.y = 0.5
      }
      wrapper.addEventListener('mousemove', handleMouseMove)
      wrapper.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        wrapper.removeEventListener('mousemove', handleMouseMove)
        wrapper.removeEventListener('mouseleave', handleMouseLeave)
        if (stateRef.current) {
          destroyKineticRipple(stateRef.current)
        }
      }
    }

    return () => {
      if (stateRef.current) {
        destroyKineticRipple(stateRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={wrapperRef}
      className="relative h-[100dvh] bg-[#111111] flex items-center justify-center overflow-hidden"
    >
      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

      {/* Section Label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <span className="text-caption text-pf-muted tracking-[0.2em]">{t('label')}</span>
      </div>

      {/* Centered Product Card */}
      <div className="relative z-10 w-[320px] md:w-[340px] bg-pf-surface border border-pf-border rounded-pf-md p-6 shadow-[0_8px_48px_rgba(0,0,0,0.4)]">
        <div className="aspect-square rounded-pf-sm overflow-hidden bg-pf-elevated">
          <img
            src="/images/product-shoes.jpg"
            alt={t('productName')}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-subsection text-pf-text">{t('productName')}</h3>
          <p className="text-sm text-pf-muted mt-1">{t('productCategory')}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-display font-bold text-pf-text">{t('price')}</span>
            <button className="bg-pf-accent text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-pf-accent-hover transition-colors">
              {t('cta')}
            </button>
          </div>
        </div>
      </div>

      {/* Technical Readouts */}
      <div className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <p className="text-xs font-body text-pf-muted/60 animate-pulse-soft">
          {t('readouts.accel')}: 0.00 m/s&sup2;
          <br />
          {t('readouts.force')}: 284N
          <br />
          {t('readouts.pulse')}: 142 BPM
        </p>
      </div>
      <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <p className="text-xs font-body text-pf-muted/60 animate-pulse-soft" style={{ animationDelay: '1.5s' }}>
          {t('readouts.grid')}: {t('readouts.active')}
          <br />
          {t('readouts.wave')}: {t('readouts.sinusoidal')}
          <br />
          {t('readouts.field')}: {t('readouts.stable')}
        </p>
      </div>
    </section>
  )
}
