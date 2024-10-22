import React, { useState, useEffect } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { motion, AnimatePresence } from 'framer-motion';

import { Menu, X, CheckCircle, Users, BookOpen, TrendingUp, Globe, Zap, ChevronDown } from 'lucide-react';











const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {



  const [isOpen, setIsOpen] = useState(false);







  return (



    <motion.div



      className="border-b border-purple-300 last:border-b-0"



      initial={false}



      animate={{ backgroundColor: isOpen ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)" }}



      transition={{ duration: 0.3 }}



    >



      <motion.button



        className="flex justify-between items-center w-full py-4 px-6 text-left"



        onClick={() => setIsOpen(!isOpen)}



      >



        <span className="text-lg font-semibold">{question}</span>



        <motion.div



          animate={{ rotate: isOpen ? 180 : 0 }}



          transition={{ duration: 0.3 }}



        >



          <ChevronDown className="w-6 h-6" />



        </motion.div>



      </motion.button>



      <AnimatePresence initial={false}>



        {isOpen && (



          <motion.div



            initial="collapsed"



            animate="open"



            exit="collapsed"



            variants={{



              open: { opacity: 1, height: "auto" },



              collapsed: { opacity: 0, height: 0 }



            }}



            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}



          >



            <div className="px-6 pb-4 text-purple-100">



              {answer}



            </div>



          </motion.div>



        )}



      </AnimatePresence>



    </motion.div>



  );



};




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

    { name: 'Our Solution', href: '#solution' },

    { name: 'Features', href: '#features' },

    { name: 'Impact', href: '#impact' },

    { name: 'Testimonials', href: '#testimonials' },

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

            FideLearn is dedicated to transforming the educational landscape for Ethiopian grade 12 students. 

            We're addressing the critical need to improve national exam pass rates and empower both students and teachers.

          </motion.p>

          <motion.div 

            className="bg-white text-purple-800 p-4 md:p-6 rounded-lg mb-8 md:mb-12 max-w-2xl mx-auto"

            variants={fadeIn}

          >

            <p className="text-base md:text-lg font-semibold">

              &ldquo;The performance has improved as compared to the previous two consecutive academic years during which the pass rates were 3.21% and 3.2%, respectively.&rdquo;

            </p>

            <p className="text-sm mt-2">- Education Minister Birhanu</p>

          </motion.div>

          <motion.div variants={fadeIn}>

            <Link href="/sign-up">

              <Button className="bg-white text-purple-600 hover:bg-purple-100 text-base md:text-lg px-6 md:px-8 py-3 md:py-4">

                Join the Educational Revolution

              </Button>

            </Link>

          </motion.div>

        </motion.section>



        <motion.section 

          id="solution"

          className="mb-16 md:mb-20"

          initial="initial"

          animate="animate"

          variants={staggerChildren}

        >

          <motion.h3 

            className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center"

            variants={fadeIn}

          >

            Our Comprehensive Solution

          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

            <motion.div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg" variants={fadeIn}>

              <h4 className="text-xl font-semibold mb-4 flex items-center">

                <Users className="mr-2" /> For Students

              </h4>

              <ul className="list-disc list-inside space-y-2">

                <li>Personalized learning paths</li>

                <li>Interactive study materials</li>

                <li>Practice exams and quizzes</li>

                <li>Progress tracking and analytics</li>

              </ul>

            </motion.div>

            <motion.div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg" variants={fadeIn}>

              <h4 className="text-xl font-semibold mb-4 flex items-center">

                <BookOpen className="mr-2" /> For Teachers

              </h4>

              <ul className="list-disc list-inside space-y-2">

                <li>Comprehensive teaching resources</li>

                <li>Student performance insights</li>

                <li>Automated grading and feedback</li>

                <li>Professional development opportunities</li>

              </ul>

            </motion.div>

          </div>

        </motion.section>



        <motion.section 

          id="features"

          className="mb-16 md:mb-20"

          initial="initial"

          animate="animate"

          variants={staggerChildren}

        >

          <motion.h2 

            className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center"

            variants={fadeIn}

          >

            Key Features

          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

            {[

              { title: "AI-Powered Learning", description: "Adaptive learning algorithms tailor content to each student's needs", icon: <Zap /> },

              { title: "Comprehensive Curriculum", description: "Covers all subjects in the Ethiopian grade 12 syllabus", icon: <BookOpen /> },

              { title: "Real-time Analytics", description: "Track progress and identify areas for improvement instantly", icon: <TrendingUp /> },

              { title: "Multilingual Support", description: "Content available in Amharic and English", icon: <Globe /> },

              { title: "Offline Access", description: "Study materials accessible without internet connection", icon: <CheckCircle /> },

              { title: "Collaborative Learning", description: "Connect with peers and teachers for group study sessions", icon: <Users /> },

            ].map((feature, index) => (

              <motion.div 

                key={index} 

                className="bg-white bg-opacity-10 p-6 rounded-lg"

                variants={fadeIn}

              >

                <div className="text-3xl mb-4">{feature.icon}</div>

                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>

                <p>{feature.description}</p>

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

            <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center shadow-lg transform hover:scale-105 transition-transform duration-300">

              <h4 className="text-4xl md:text-5xl font-bold mb-2">100,000+</h4>

              <p className="text-xl">Students Empowered</p>

            </div>

            <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center shadow-lg transform hover:scale-105 transition-transform duration-300">

              <h4 className="text-4xl md:text-5xl font-bold mb-2">35%</h4>

              <p className="text-xl">Average Grade Improvement</p>

            </div>

            <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center shadow-lg transform hover:scale-105 transition-transform duration-300">

              <h4 className="text-4xl md:text-5xl font-bold mb-2">500+</h4>

              <p className="text-xl">Partner Schools</p>

            </div>

          </div>

        </motion.section>



        <motion.section 

          id="testimonials"

          className="mb-16 md:mb-20"

          initial="initial"

          animate="animate"

          variants={staggerChildren}

        >

          <motion.h2 

            className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center"

            variants={fadeIn}

          >

            Success Stories

          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">

            {[

              { name: "Abebe Kebede", role: "Student", quote: "FideLearn transformed my study habits. I went from struggling to excelling in my exams!", image: "https://i.pravatar.cc/150?img=11" },

              { name: "Tigist Haile", role: "Teacher", quote: "As a teacher, FideLearn has given me powerful tools to engage my students and track their progress effectively.", image: "https://i.pravatar.cc/150?img=5" }

            ].map((testimonial, index) => (

              <motion.div 

                key={index} 

                className="bg-white bg-opacity-10 p-6 rounded-lg flex items-center"

                variants={fadeIn}

              >

                <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mr-4" />

                <div>

                  <p className="mb-2 italic">"{testimonial.quote}"</p>

                  <p className="font-semibold">{testimonial.name}</p>

                  <p className="text-sm">{testimonial.role}</p>

                </div>

              </motion.div>

            ))}

          </div>

        </motion.section>



        <motion.section 

          id="faq"

          className="mb-16 md:mb-20"

          initial="initial"

          animate="animate"

          variants={staggerChildren}

        >

          <motion.h2 

            className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center"

            variants={fadeIn}

          >

            Frequently Asked Questions

          </motion.h2>

              <motion.div 

            className="max-w-3xl mx-auto bg-white bg-opacity-10 rounded-lg overflow-hidden shadow-xl"


                variants={fadeIn}

              >

            {[



              { 



                question: "How does FideLearn improve exam performance?", 



                answer: "FideLearn uses AI-powered adaptive learning to identify and address each student's unique strengths and weaknesses, providing personalized study plans and targeted practice. This tailored approach ensures that students focus on areas where they need the most improvement, leading to better exam performance."



              },



              { 



                question: "Is FideLearn accessible in rural areas?", 



                answer: "Yes, FideLearn is designed to work offline, allowing students in areas with limited internet connectivity to access study materials and track their progress. Once the initial content is downloaded, students can continue learning without an internet connection, making it accessible even in the most remote areas of Ethiopia."



              },



              { 



                question: "How does FideLearn support teachers?", 



                answer: "FideLearn provides teachers with comprehensive teaching resources, automated grading tools, and detailed insights into student performance. This allows teachers to tailor their instruction effectively, identify struggling students, and focus on areas where the class needs more support. Additionally, FideLearn offers professional development resources to help teachers enhance their skills and stay up-to-date with the latest educational methodologies."



              },



              { 



                question: "Can FideLearn be used in schools and at home?", 



                answer: "Absolutely! FideLearn is designed for both classroom use and independent study, providing a seamless learning experience across different environments. Teachers can integrate FideLearn into their lesson plans, while students can continue their studies at home, ensuring consistent and continuous learning."



              }



            ].map((faq, index) => (



              <FAQItem key={index} question={faq.question} answer={faq.answer} />



            ))}



          </motion.div>


        </motion.section>



        <motion.section 

          className="mb-16 md:mb-20"

          initial="initial"

          animate="animate"

          variants={fadeIn}

        >

          <h3 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Ready to Transform Your Education?</h3>

          <div className="text-center">

            <Link href="/sign-up">

              <Button className="bg-white text-purple-600 hover:bg-purple-100 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-lg hover:shadow-xl transition-shadow duration-300">

                Get Started Now

              </Button>

            </Link>

          </div>

        </motion.section>

      </main>



      <footer className="container mx-auto px-4 py-6 md:py-8 mt-10 md:mt-20 text-center border-t border-white border-opacity-20">

        <p className="text-sm md:text-base">&copy; 2024 FideLearn. Empowering Ethiopian Education.</p>
        <p className="text-sm md:text-base">By kirubel</p>

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







