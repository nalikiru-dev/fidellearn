"use client"

import { useState, useCallback } from 'react'

export interface Toast {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((newToast: Toast) => {
    setToast(newToast);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  return { toast, showToast, dismissToast };
}
