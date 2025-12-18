'use client'

import * as React from 'react'
import { toast as hotToast } from 'react-hot-toast'
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface ToastMoleculeOptions {
  variant?: ToastVariant
  title: string
  description?: string
  duration?: number
}

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info
}

const variantStyles = {
  success: 'border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400',
  error: 'border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400',
  warning: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  info: 'border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400'
}

export const toast = {
  success: (title: string, description?: string, duration?: number) => {
    showToast({ variant: 'success', title, description, duration })
  },
  error: (title: string, description?: string, duration?: number) => {
    showToast({ variant: 'error', title, description, duration })
  },
  warning: (title: string, description?: string, duration?: number) => {
    showToast({ variant: 'warning', title, description, duration })
  },
  info: (title: string, description?: string, duration?: number) => {
    showToast({ variant: 'info', title, description, duration })
  }
}

const showToast = ({ variant = 'info', title, description, duration = 4000 }: ToastMoleculeOptions) => {
  const Icon = icons[variant]
  const style = variantStyles[variant]

  hotToast.custom(
    (t) => (
      <div
        className={cn(
          'flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all',
          style,
          t.visible ? 'animate-in slide-in-from-top-5' : 'animate-out slide-out-to-top-5'
        )}
        style={{ maxWidth: '400px' }}
      >
        <Icon className="size-5 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm">{title}</p>
          {description && <p className="text-xs mt-1 opacity-90">{description}</p>}
        </div>
        <button
          onClick={() => hotToast.dismiss(t.id)}
          className="shrink-0 rounded p-1 hover:bg-background/20 transition-colors"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>
      </div>
    ),
    { duration }
  )
}

export const ToastMolecule = {
  success: toast.success,
  error: toast.error,
  warning: toast.warning,
  info: toast.info
}

