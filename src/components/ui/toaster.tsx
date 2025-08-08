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
    <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

function ToastComponent({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onRemove(toast.id), 150)
    }, 4000)

    return () => clearTimeout(timer)
  }, [toast.id, onRemove])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onRemove(toast.id), 150)
  }

  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all",
        {
          "border-destructive bg-destructive text-destructive-foreground": toast.variant === "destructive",
          "border-green-500 bg-green-50 text-green-900": toast.variant === "success",
          "bg-background text-foreground": toast.variant === "default" || !toast.variant,
        },
        isVisible ? "animate-in slide-in-from-right-full" : "animate-out slide-out-to-right-full"
      )}
    >
      <div className="grid gap-1">
        <div className="flex items-center gap-2">
          {toast.variant === "success" && <CheckCircle2 className="h-4 w-4" />}
          {toast.variant === "destructive" && <XCircle className="h-4 w-4" />}
          {toast.title && (
            <div className="text-sm font-semibold [&+div]:text-xs">
              {toast.title}
            </div>
          )}
        </div>
        {toast.description && (
          <div className="text-sm opacity-90">
            {toast.description}
          </div>
        )}
      </div>
      {toast.action}
      <button
        onClick={handleClose}
        className="absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none group-hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}