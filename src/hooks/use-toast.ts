import { useState, useCallback } from "react"
import type { Toast } from "@/components/ui/toaster"

let toastCount = 0

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ variant = "default", title, description }: Omit<Toast, "id">) => {
    const id = `toast-${++toastCount}`
    
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        id,
        variant,
        title,
        description,
      },
    ])

    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return {
    toast,
    toasts,
    removeToast,
  }
}