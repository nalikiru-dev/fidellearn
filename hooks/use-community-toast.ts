import { useState, useCallback } from 'react'

export interface CommunityToast {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useCommunityToast() {
  const [toast, setToast] = useState<CommunityToast | null>(null);

  const showToast = useCallback((newToast: CommunityToast) => {
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