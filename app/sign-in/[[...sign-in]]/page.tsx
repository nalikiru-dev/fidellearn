'use client';

import { SignIn, useUser } from "@clerk/nextjs";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDashboardRoute } from '@/lib/utils';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Globe, Sparkles, GraduationCap } from 'lucide-react';

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setIsRedirecting(true);
      const dashboardRoute = getDashboardRoute(user);
      setTimeout(() => {
        router.push(dashboardRoute);
      }, 1500);
    }
  }, [isSignedIn, isLoaded, user, router]);

  if (isRedirecting) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center"
        />
        
        {/* Floating particles */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-xl"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-indigo-400 rounded-full blur-xl"
        />

        {/* Welcome back content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 text-white"
            >
              <Sparkles className="w-full h-full" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Welcome Back!
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl text-gray-600 mb-8"
          >
            Taking you to your personalized dashboard...
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center space-x-4"
          >
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Sign In Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white relative">
        {/* Education icon with animated background */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
          >
            <GraduationCap className="w-8 h-8 text-white" />
          </motion.div>
        </div>

        <div className="w-full max-w-md space-y-8 mt-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Continue your learning journey</p>
          </div>
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
                card: 'shadow-none',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton: 'border-2 border-gray-200 hover:bg-gray-50 transition-colors',
                formFieldInput: 'border-2 focus:border-blue-600',
                footer: 'hidden'
              },
            }}
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            redirectUrl="/"
            afterSignInUrl="/dashboard"
          />
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Features/Benefits */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
        <div className="w-full flex flex-col justify-center px-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            <h1 className="text-4xl font-bold mb-6">Empower Your Learning Journey</h1>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Brain className="w-6 h-6 text-blue-200" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Learning</h3>
                  <p className="text-blue-100">Personalized learning paths tailored to your unique needs and goals</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Globe className="w-6 h-6 text-blue-200" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Multi-Language Support</h3>
                  <p className="text-blue-100">Learn in English, አማርኛ, Afaan Oromoo, and ትግርኛ</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-200" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Rich Content Library</h3>
                  <p className="text-blue-100">Access a vast collection of educational resources and materials</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Sparkles className="w-6 h-6 text-blue-200" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
                  <p className="text-blue-100">Engage with dynamic content and real-time feedback</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
