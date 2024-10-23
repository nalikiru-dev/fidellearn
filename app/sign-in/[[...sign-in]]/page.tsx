import { SignIn, useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDashboardRoute } from '@/lib/utils';

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setIsRedirecting(true);
      const dashboardRoute = getDashboardRoute(user);
      setTimeout(() => {
        router.push(dashboardRoute);
      }, 1500); // Delay for 1.5 seconds to show the redirection message
    }
  }, [isSignedIn, isLoaded, user, router]);

  if (isRedirecting) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
        <div className="text-white text-2xl mb-4">Welcome back!</div>
        <div className="text-indigo-200">Redirecting to your personalized dashboard...</div>
        <div className="mt-4 w-12 h-12 border-t-2 border-indigo-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-indigo-500 hover:bg-indigo-600 text-sm normal-case',
          },
        }}
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl={({ user }) => getDashboardRoute(user)}
      />
      <p className="mt-4 text-white">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="text-indigo-200 hover:text-indigo-100 underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
