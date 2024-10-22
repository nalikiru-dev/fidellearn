"use client"

import { useState, useCallback } from 'react'

interface ToastProps {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

export function useToast() {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = useCallback((props: ToastProps) => {
    setToast(props);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  return { toast, showToast, dismissToast };
}
