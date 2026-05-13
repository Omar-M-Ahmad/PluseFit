'use client'

import { useState, forwardRef } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  as?: 'input' | 'textarea' | 'select'
  options?: { value: string; label: string }[]
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, type = 'text', as = 'input', options, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    if (as === 'textarea') {
      return (
        <div className="w-full">
          {label && (
            <label className="block text-sm font-medium text-pf-text mb-2">{label}</label>
          )}
          <textarea
            className={cn(
              'w-full min-h-[100px] px-4 py-3 bg-pf-elevated border border-pf-border rounded-pf-sm',
              'text-pf-text placeholder:text-pf-muted/50',
              'focus:outline-none focus:border-pf-accent focus:ring-2 focus:ring-pf-accent/10',
              'transition-all duration-200 resize-vertical',
              className
            )}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
          {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
        </div>
      )
    }

    if (as === 'select') {
      return (
        <div className="w-full">
          {label && (
            <label className="block text-sm font-medium text-pf-text mb-2">{label}</label>
          )}
          <select
            className={cn(
              'w-full h-12 px-4 py-3 bg-pf-elevated border border-pf-border rounded-pf-sm',
              'text-pf-text placeholder:text-pf-muted/50 appearance-none',
              'focus:outline-none focus:border-pf-accent focus:ring-2 focus:ring-pf-accent/10',
              'transition-all duration-200',
              className
            )}
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            <option value="">{props.placeholder || 'Select...'}</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
        </div>
      )
    }

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-pf-text mb-2">{label}</label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={cn(
              'w-full h-12 px-4 bg-pf-elevated border border-pf-border rounded-pf-sm',
              'text-pf-text placeholder:text-pf-muted/50',
              'focus:outline-none focus:border-pf-accent focus:ring-2 focus:ring-pf-accent/10',
              'transition-all duration-200',
              isPassword && 'pr-12',
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pf-muted hover:text-pf-text transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && <span className="text-xs text-red-500 mt-1 block">{error}</span>}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'
