'use client';
import { useState, useEffect } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Toast } from '@/components/ui/profile-toast';
import { motion } from "framer-motion";
import Link from 'next/link';
import { GraduationCap, BookOpen, Brain, Globe, ChevronRight } from 'lucide-react';
import { useUser } from "@clerk/nextjs";
import { getDashboardRoute } from '@/lib/utils';
import { Sparkles, Rocket } from 'lucide-react';

type UserRole = 'student' | 'teacher' | 'staff' | 'manager';

const features = [
  {
    title: "Start Your Learning Journey",
    description: "Join thousands of students learning on FideLearn",
    icon: "",
    delay: 0.2
  },
  {
    title: "Personalized Experience",
    description: "Get content tailored to your learning style",
    icon: "",
    delay: 0.4
  },
  {
    title: "Learn in Your Language",
    description: "Choose from English, Amharic, Afaan Oromoo, or Tigrinya",
    icon: "",
    delay: 0.6
  },
  {
    title: "Connect & Collaborate",
    description: "Join study groups and connect with peers",
    icon: "",
    delay: 0.8
  }
];

const SignUpPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  
  const { isLoaded: signUpLoaded, signUp, setActive } = useSignUp();
  const { toast, showToast, dismissToast } = useToast();

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
        
        {/* Animated particles */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/3 left-1/3 w-40 h-40 bg-indigo-400 rounded-full blur-xl"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-blue-400 rounded-full blur-xl"
        />

        {/* Welcome content */}
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
            className="w-28 h-28 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
          >
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 text-white"
            >
              <Rocket className="w-full h-full" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold text-gray-900">
              You're Already On Board!
            </h1>
            <p className="text-xl text-gray-600">
              Redirecting you to your learning journey...
            </p>
          </motion.div>

          {/* Animated progress dots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 flex justify-center space-x-4"
          >
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          </motion.div>

          {/* Animated sparkles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute top-10 right-10"
          >
            <Sparkles className="w-8 h-8 text-indigo-500 animate-pulse" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-10 left-10"
          >
            <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (!signUpLoaded) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        username,
        password,
        firstName,
        lastName,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      showToast({
        title: "Verification email sent",
        description: "Please check your email for the verification code.",
        type: "info",
      });
    } catch (err: any) {
      console.error('Error during sign up:', err);
      showToast({
        title: "Sign up failed",
        description: err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "An unexpected error occurred",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        throw new Error("Unable to verify email address");
      }
      await setActive({ session: completeSignUp.createdSessionId });
      router.push("/dashboard");
    } catch (err: any) {
      console.error('Error during verification:', err);
      showToast({
        title: "Verification failed",
        description: err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "An unexpected error occurred",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Sign Up Form */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-white relative"
      >
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

        <div className="w-full max-w-md space-y-6 mt-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-600">Join the Ethiopian learning revolution</p>
            </motion.div>
          </div>

          {!pendingVerification ? (
            <>
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 focus:border-blue-500 transition-colors"
                  required
                />
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-2 focus:border-blue-500 transition-colors"
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 focus:border-blue-500 transition-colors"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-2 focus:border-blue-500 transition-colors"
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-2 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                <Select onValueChange={(value: UserRole) => setRole(value)} value={role}>
                  <SelectTrigger className="w-full border-2 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg transition-all transform hover:scale-[1.02]" 
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </motion.form>

              {/* Sign In Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 text-center"
              >
                <p className="text-gray-600">
                  Already have an account?
                </p>
                <Link 
                  href="/sign-in" 
                  className="group inline-flex items-center justify-center mt-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                >
                  <span>Sign in to your account</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </motion.span>
                </Link>
              </motion.div>
            </>
          ) : (
            <motion.form 
              onSubmit={handleVerification} 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold mb-2">Verify Your Email</h2>
                <p className="text-gray-600">Enter the code we sent to your email</p>
              </div>
              <Input
                type="text"
                placeholder="Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-center text-2xl tracking-wider border-2 focus:border-blue-500 transition-colors"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg transition-all transform hover:scale-[1.02]" 
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Complete Sign Up'}
              </Button>
            </motion.form>
          )}
        </div>
      </motion.div>

      {/* Right side - Features */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex flex-1 bg-gradient-to-bl from-purple-600 via-blue-600 to-purple-700 text-white p-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="mb-12">
            <motion.h2 
              className="text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Welcome to FideLearn
            </motion.h2>
            <motion.p 
              className="text-lg opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Join our community of learners and start your educational journey today
            </motion.p>
          </div>

          <div className="grid gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="flex items-start space-x-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm"
              >
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">{feature.title}</h3>
                  <p className="opacity-85">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {toast && (
        <Toast
          title={toast.title}
          description={toast.description}
          type={toast.type as 'success' | 'error' | 'info'}
          onClose={dismissToast}
        />
      )}
    </div>
  );
};

export default SignUpPage;