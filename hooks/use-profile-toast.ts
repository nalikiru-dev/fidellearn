import { useState, useCallback } from 'react'

export interface ProfileToast {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

export function useProfileToast() {
  const [toast, setToast] = useState<ProfileToast | null>(null);

  const showToast = useCallback((newToast: ProfileToast) => {
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