import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Courses', href: '#courses' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Success Stories', href: '#success-stories' },
    { name: 'Partnerships', href: '#partnerships' },
    { name: 'Impact', href: '#impact' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-purple-900 bg-opacity-90 shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src="https://placehold.co/40x40?text=FL" alt="FideLearn Logo" width={40} height={40} />
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              FideLearn
            </h1>
          </motion.div>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="text-white hover:text-purple-200 transition-colors duration-200 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/sign-in">
                <Button variant="outline" className="text-red-500 border-white hover:bg-white hover:text-purple-600">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </nav>
          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full md:w-80 bg-purple-900 bg-opacity-95 z-50 p-6"
          >
            <motion.button
              className="absolute top-6 right-6 text-white"
              onClick={() => setIsMenuOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
            <nav className="flex flex-col space-y-6 mt-16">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="text-white hover:text-purple-200 transition-colors duration-200 text-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <Link href="/sign-in">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600 w-full">
                  Sign In
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-10 md:py-20 pt-20 md:pt-28">
        <motion.section 
          id="home"
          className="text-center mb-16 md:mb-20"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold mb-6 md:mb-8 leading-tight"
            variants={fadeIn}
          >
            Revolutionizing Ethiopian Education
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl mb-8 md:mb-12 max-w-3xl mx-auto"
            variants={fadeIn}
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            FideLearn is dedicated to transforming the educational landscape for Ethiopian grade 12 students. 
            We&apos;re addressing the critical need to improve national exam pass rates and empower both students and teachers.
          </motion.p>
          <motion.div 
            className="bg-white text-purple-800 p-4 md:p-6 rounded-lg mb-8 md:mb-12 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            <p className="text-base md:text-lg font-semibold">
            &quot;The performance has improved as compared to the previous two consecutive academic years during which the pass rates were 3.21% and 3.2%, respectively.&quot;
            </p>
            <p className="text-sm mt-2">- Education Minister Birhanu</p>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Link href="/sign-up">
              <Button className="bg-white text-purple-600 hover:bg-purple-100 text-base md:text-lg px-6 md:px-8 py-6 md:py-4 w-full md:w-auto">
                Join the Educational Revolution
              </Button>
            </Link>
          </motion.div>
        </motion.section>

        <motion.section 
          id="features"
          className="mb-16 md:mb-20"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center"
            variants={fadeIn}
          >
            Our Key Features
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {[
              { title: "AI-Powered Tutoring", description: "Personalized learning experiences tailored to each student's needs", icon: "https://placehold.co/40x40?text=AI" },
              { title: "Comprehensive Curriculum", description: "Covering all subjects in the Ethiopian grade 12 syllabus", icon: "https://placehold.co/40x40?text=CC" },
              { title: "Teacher Support", description: "Resources and tools to enhance classroom instruction", icon: "https://placehold.co/40x40?text=TS" },
              { title: "Progress Tracking", description: "Real-time monitoring of student performance and areas for improvement", icon: "https://placehold.co/40x40?text=PT" },
              { title: "Multilingual Support", description: "Content available in Amharic and English to cater to diverse linguistic needs", icon: "https://placehold.co/40x40?text=MS" },
              { title: "Offline Access", description: "Study materials accessible offline for students with limited internet connectivity", icon: "https://placehold.co/40x40?text=OA" }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white bg-opacity-10 p-4 md:p-6 rounded-lg flex items-start"
                variants={fadeIn}
              >
                <img src={feature.icon} alt={feature.title} width={40} height={40} className="mr-4" />
                <div>
                  <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">{feature.title}</h4>
                  <p className="text-sm md:text-base">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          id="courses"
          className="mb-16 md:mb-20"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center"
            variants={fadeIn}
          >
            Our Courses
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {[
              { title: "Mathematics", image: "https://placehold.co/400x200?text=Mathematics" },
              { title: "Physics", image: "https://placehold.co/400x200?text=Physics" },
              { title: "Chemistry", image: "https://placehold.co/400x200?text=Chemistry" },
              { title: "Biology", image: "https://placehold.co/400x200?text=Biology" },
              { title: "English", image: "https://placehold.co/400x200?text=English" },
              { title: "Civics", image: "https://placehold.co/400x200?text=Civics" }
            ].map((course, index) => (
              <motion.div 
                key={index} 
                className="bg-white bg-opacity-10 rounded-lg overflow-hidden"
                variants={fadeIn}
              >
                <img src={course.image} alt={course.title} width={400} height={200} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="text-lg md:text-xl font-semibold mb-2">{course.title}</h4>
                  <Button className="w-full">Explore Course</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          id="how-it-works"
          className="mb-16 md:mb-20"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center"
            variants={fadeIn}
          >
            How It Works
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { step: "1", title: "Sign Up", description: "Create your FideLearn account", icon: "https://placehold.co/64x64?text=Sign+Up" },
              { step: "2", title: "Choose Subjects", description: "Select the subjects you want to study", icon: "https://placehold.co/64x64?text=Choose" },
              { step: "3", title: "Start Learning", description: "Engage with AI-powered lessons and exercises", icon: "https://placehold.co/64x64?text=Learn" },
              { step: "4", title: "Track Progress", description: "Monitor your improvement over time", icon: "https://placehold.co/64x64?text=Track" }
            ].map((step, index) => (
              <motion.div key={index} className="text-center" variants={fadeIn}>
                <img src={step.icon} alt={step.title} width={64} height={64} className="mx-auto mb-4" />
                <div className="bg-white text-purple-600 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mx-auto mb-3 md:mb-4 font-bold text-lg md:text-xl">
                  {step.step}
                </div>
                <h4 className="text-lg md:text-xl font-semibold mb-2">{step.title}</h4>
                <p className="text-sm md:text-base">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          id="success-stories"
          className="mb-16 md:mb-20"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center"
            variants={fadeIn}
          >
            Success Stories
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {[
              { name: "Abebe Kebede", school: "Addis Ababa Science and Technology University", quote: "FideLearn helped me improve my grades significantly. I feel much more confident about the national exams now.", image: "https://placehold.co/80x80?text=AK" },
              { name: "Tigist Haile", school: "Bahir Dar University", quote: "The personalized learning approach of FideLearn made studying enjoyable and effective. It's a game-changer for Ethiopian students.", image: "https://placehold.co/80x80?text=TH" }
            ].map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="bg-white bg-opacity-10 p-4 md:p-6 rounded-lg flex items-center"
                variants={fadeIn}
              >
                <img src={testimonial.image} alt={testimonial.name} width={80} height={80} className="rounded-full mr-4" />
                <div>
                  <p className="mb-3 md:mb-4 italic text-sm md:text-base">`&quot;{testimonial.quote}&quot;</p>
                  <p className="font-semibold text-base md:text-lg">{testimonial.name}</p>
                  <p className="text-xs md:text-sm">{testimonial.school}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          id="partnerships"
          className="mb-16 md:mb-20"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center"
            variants={fadeIn}
          >
            Partnerships
          </motion.h3>
          <motion.p 
            className="text-center mb-6 md:mb-8 text-sm md:text-base"
            variants={fadeIn}
          >
            We&apos;re proud to collaborate with leading educational institutions and organizations:
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { name: "Ministry of Education", logo: "https://placehold.co/60x60?text=MoE" },
              { name: "Ethiopian Education and Research Network", logo: "https://placehold.co/60x60?text=EERN" },
              { name: "Addis Ababa University", logo: "https://placehold.co/60x60?text=AAU" }
            ].map((partner, index) => (
              <motion.div 
                key={index} 
                className="bg-white bg-opacity-10 p-3 md:p-4 rounded-lg flex items-center"
                variants={fadeIn}
              >
                <img src={partner.logo} alt={partner.name} width={60} height={60} className="mr-3" />
                <p className="font-semibold text-sm md:text-base">{partner.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          id="impact"
          className="mb-16 md:mb-20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Our Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            <div className="bg-white bg-opacity-10 p-4 md:p-6 rounded-lg text-center">
              <h4 className="text-3xl md:text-4xl font-bold mb-2">50,000+</h4>
              <p className="text-sm md:text-base">Students Empowered</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 md:p-6 rounded-lg text-center">
              <h4 className="text-3xl md:text-4xl font-bold mb-2">95%</h4>
              <p className="text-sm md:text-base">User Satisfaction Rate</p>
            </div>
            <div className="bg-white bg-opacity-10 p-4 md:p-6 rounded-lg text-center">
              <h4 className="text-3xl md:text-4xl font-bold mb-2">30%</h4>
              <p className="text-sm md:text-base">Average Grade Improvement</p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="faq"
          className="mb-16 md:mb-20"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center"
            variants={fadeIn}
          >
            Frequently Asked Questions
          </motion.h3>
          <div className="space-y-4">
            {[
              { question: "How does FideLearn work?", answer: "FideLearn uses AI-powered technology to provide personalized learning experiences for Ethiopian grade 12 students. Our platform offers comprehensive course materials, practice exercises, and progress tracking to help students prepare for their national exams." },
              { question: "Is FideLearn available in Amharic?", answer: "Yes, FideLearn offers content in both Amharic and English to cater to diverse linguistic needs of Ethiopian students." },
              { question: "Can I access FideLearn offline?", answer: "Yes, FideLearn provides offline access to study materials, making it accessible for students with limited internet connectivity." },
              { question: "How much does FideLearn cost?", answer: "FideLearn offers various subscription plans to suit different needs. Please contact our sales team for detailed pricing information." }
            ].map((faq, index) => (
              <motion.div 
                key={index} 
                className="bg-white bg-opacity-10 p-4 md:p-6 rounded-lg"
                variants={fadeIn}
              >
                <h4 className="text-lg md:text-xl font-semibold mb-2">{faq.question}</h4>
                <p className="text-sm md:text-base">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="mb-16 md:mb-20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Ready to Transform Your Education?</h3>
          <div className="text-center">
            <Link href="/sign-up">
              <Button className="bg-white text-purple-600 hover:bg-purple-100 text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                Get Started Now
              </Button>
            </Link>
          </div>
        </motion.section>
      </main>

      <footer className="container mx-auto px-4 py-6 md:py-8 mt-10 md:mt-20 text-center border-t border-white border-opacity-20">
        <p className="text-sm md:text-base">&copy; 2024 FideLearn. Empowering Ethiopian Education.</p>
        <div className="mt-3 md:mt-4 space-x-4">
          <a href="#" className="text-xs md:text-sm hover:underline">Privacy Policy</a>
          <a href="#" className="text-xs md:text-sm hover:underline">Terms of Service</a>
          <a href="#" className="text-xs md:text-sm hover:underline">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;