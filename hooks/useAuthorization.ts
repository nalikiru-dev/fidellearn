'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useAuthorization = (allowedRoles: string[]) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    } else if (isLoaded && isSignedIn) {
      const userRole = user?.publicMetadata?.role as string;
      if (!allowedRoles.includes(userRole)) {
        router.push('/unauthorized');
      } else {
        setIsAuthorized(true);
      }
    }
  }, [isLoaded, isSignedIn, user, router, allowedRoles]);

  return { isLoaded, isAuthorized };
};
