import { cn } from "../../lib/utils"
import { CheckCircle2, X, XCircle } from "lucide-react"
import { useState, useEffect, type ReactNode } from "react"

export interface Toast {
  id: string
  title?: string
  description?: string
  action?: ReactNode
  variant?: "default" | "destructive" | "success"
}

interface ToasterProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

export function Toaster({ toasts, onRemove }: ToasterProps) {
  return (
    <div 
      className="fixed z-[9999] pointer-events-none"
      style={{
        bottom: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column-reverse',
        maxWidth: '420px'
      }}
    >
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

function ToastComponent({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Start animation after mount
    const timer = setTimeout(() => setIsVisible(true), 50)
    
    // Auto remove after 4 seconds
    const removeTimer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onRemove(toast.id), 300)
    }, 4000)

    return () => {
      clearTimeout(timer)
      clearTimeout(removeTimer)
    }
  }, [toast.id, onRemove])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onRemove(toast.id), 300)
  }

  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-3 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg mb-2 min-w-[350px] max-w-[420px]",
        "transform transition-all duration-300 ease-out",
        {
          "border-red-300 bg-red-50 text-red-800": toast.variant === "destructive",
          "border-green-300 bg-green-50 text-green-800": toast.variant === "success",
          "bg-white text-gray-900 border-gray-200": toast.variant === "default" || !toast.variant,
        },
        isVisible 
          ? "translate-x-0 opacity-100" 
          : "translate-x-full opacity-0"
      )}
      style={{
        transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
        opacity: isVisible ? 1 : 0
      }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {toast.variant === "success" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
          {toast.variant === "destructive" && <XCircle className="h-5 w-5 text-red-600" />}
        </div>
        <div className="grid gap-1 flex-1">
          {toast.title && (
            <div className="text-sm font-semibold">
              {toast.title}
            </div>
          )}
          {toast.description && (
            <div className="text-sm opacity-90">
              {toast.description}
            </div>
          )}
        </div>
      </div>
      {toast.action}
      <button
        onClick={handleClose}
        className="absolute right-2 top-2 rounded-md p-1 text-gray-400 opacity-70 transition-opacity hover:text-gray-600 hover:opacity-100 focus:opacity-100 focus:outline-none"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}