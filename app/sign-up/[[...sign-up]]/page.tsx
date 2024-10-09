import { SignUp } from "@clerk/nextjs";
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-indigo-500 hover:bg-indigo-600 text-sm normal-case',
          },
        }}
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        redirectUrl="/"
      />
      <p className="mt-4 text-white">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-indigo-200 hover:text-indigo-100 underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}