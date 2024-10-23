'use client';

import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getDashboardRoute } from '@/lib/utils';

export default function DashboardRedirect() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user) {
        const dashboardRoute = getDashboardRoute(user);
        router.push(dashboardRoute);
      } else {
        router.push('/sign-in');
      }
    }
  }, [isSignedIn, isLoaded, user, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
