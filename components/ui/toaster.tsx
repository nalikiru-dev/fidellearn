"use client"

import {
  Toast,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toast } = useToast()

  return (
    <ToastProvider>
      {toast && (
        <Toast
          key={toast.title}
          title={toast.title}
          description={toast.description}
          type={toast.type as 'success' | 'error' | 'info'}
          onClose={() => {}}
        />
      )}
      <ToastViewport />
    </ToastProvider>
  )
}
