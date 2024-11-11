import React, { useState, useEffect } from 'react';



import Link from 'next/link';



import { Button } from '@/components/ui/button';



import { motion, AnimatePresence } from 'framer-motion';



import { Menu, X, CheckCircle, Users, BookOpen, TrendingUp, Globe, Zap, ChevronDown } from 'lucide-react';



import { FAQSection } from '@/components/Landing/FAQSection';



import { MobileMenu } from '@/components/Landing/MobileMenu';



import { QuoteSection } from '@/components/Landing/QuoteSection';



import { CTAButton } from '@/components/Landing/CTAButton';







interface Feature {







  title: string;







  icon: JSX.Element;







  description: string;







  color: string;







}















interface Testimonial {







  name: string;







  role: string;







  quote: string;







  image: string;







}















interface Stat {







  number: string;







  label: string;







  color: string;







}











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















  const features: Feature[] = [







    {







      title: "AI-Powered Learning",







      icon: <Zap className="text-blue-600" />,







      color: "bg-blue-50/80",







      description: "Adaptive learning algorithms tailor content to each student's needs"







    },







    {







      title: "Comprehensive Curriculum",







      icon: <BookOpen className="text-indigo-600" />,







      color: "bg-indigo-50/80",







      description: "Complete coverage of Ethiopian grade 12 syllabus"







    },







    {







      title: "Real-time Analytics",







      icon: <TrendingUp className="text-purple-600" />,







      color: "bg-purple-50/80",







      description: "Track progress and identify areas for improvement instantly"







    },







    {







      title: "Multilingual Support",







      icon: <Globe className="text-emerald-600" />,







      color: "bg-emerald-50/80",







      description: "Content available in Amharic and English"







    },







    {







      title: "Offline Access",







      icon: <CheckCircle className="text-cyan-600" />,







      color: "bg-cyan-50/80",







      description: "Study materials accessible without internet connection"







    },







    {







      title: "Collaborative Learning",







      icon: <Users className="text-violet-600" />,







      color: "bg-violet-50/80",







      description: "Connect with peers and teachers for group study sessions"







    }







  ];















  const stats: Stat[] = [







    {







      number: "100,000+",







      label: "Students Empowered",







      color: "bg-gradient-to-br from-blue-50 to-blue-100/50"







    },







    {







      number: "35%",







      label: "Average Grade Improvement",







      color: "bg-gradient-to-br from-indigo-50 to-indigo-100/50"







    },







    {







      number: "500+",







      label: "Partner Schools",







      color: "bg-gradient-to-br from-purple-50 to-purple-100/50"







    }







  ];















  const testimonials: Testimonial[] = [







    {







      name: "Abebe Kebede",







      role: "Student",







      quote: "FideLearn transformed my study habits. I went from struggling to excelling in my exams!",







      image: "https://i.pravatar.cc/150?img=11"







    },







    {







      name: "Tigist Haile",







      role: "Teacher",







      quote: "As a teacher, FideLearn has given me powerful tools to engage my students and track their progress effectively.",







      image: "https://i.pravatar.cc/150?img=5"







    }







  ];











  return (



    <div className="min-h-screen bg-white">







      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${



        scrolled 



          ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm' 







          : 'bg-transparent'



      }`}>







        <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">



          <motion.div 



            className="flex items-center space-x-2"



            initial={{ opacity: 0, x: -20 }}



            animate={{ opacity: 1, x: 0 }}



            transition={{ duration: 0.5 }}



          >







            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">



              <span className="text-white font-bold text-xl">F</span>



            </div>



            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">



              FideLearn



            </h1>



          </motion.div>



          <nav className="hidden md:flex items-center space-x-8">



            {navItems.map((item, index) => (



              <motion.a



                key={index}



                href={item.href}



                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"



                whileHover={{ scale: 1.05 }}



                whileTap={{ scale: 0.95 }}



              >







                {item.name}



              </motion.a>



            ))}







            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>



              <Link href="/sign-in">



                <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">



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







      <MobileMenu 



        isOpen={isMenuOpen} 



        onClose={() => setIsMenuOpen(false)} 



        navItems={navItems} 



      />







      <main className="container mx-auto px-4 py-10 md:py-20 pt-32">



        <motion.section 



          id="home"



          className="relative"



          initial="initial"



          animate="animate"



          variants={staggerChildren}



        >







          <div className="absolute inset-0 -z-10">



            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />







            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white" />







          </div>







          <div className="text-center max-w-5xl mx-auto">



            <motion.h2 



              className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"



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



            <QuoteSection />



            <CTAButton />



          </div>







          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">



            {features.map((feature, index: number) => (







              <motion.div



                key={index}



                className={`${feature.color} p-8 rounded-3xl hover:shadow-xl transition-all duration-300 border border-gray-100/50 backdrop-blur-sm`}







                variants={fadeIn}



                whileHover={{ y: -5 }}







              >







                <div className="flex items-center space-x-4 mb-4">







                  <div className="p-3 rounded-2xl bg-white shadow-sm">







                    {feature.icon}







                  </div>







                  <h3 className="text-xl font-semibold">{feature.title}</h3>







                </div>







                <p className="text-gray-600 leading-relaxed">







                  {feature.description}







                </p>







              </motion.div>



            ))}







          </div>



        </motion.section>







        <motion.section 



          id="impact"



          className="my-32"



          variants={fadeIn}



        >







          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">



            {stats.map((stat, index: number) => (







              <motion.div



                key={index}



                className={`${stat.color} p-8 rounded-3xl text-center relative overflow-hidden group backdrop-blur-sm`}







                whileHover={{ scale: 1.02 }}



              >







                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-full transition-transform duration-1000" />







                <h4 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">



                  {stat.number}



                </h4>



                <p className="text-xl text-gray-600">{stat.label}</p>



              </motion.div>



            ))}







          </div>



        </motion.section>







        <motion.section 



          id="testimonials"



          className="my-32"







            variants={fadeIn}



        >







          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">







            {testimonials.map((testimonial, index: number) => (







              <motion.div 



                key={index} 



                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"







                variants={fadeIn}



                whileHover={{ scale: 1.02 }}







              >







                <div className="flex items-start space-x-4">







                  <img







                    src={testimonial.image}







                    alt={testimonial.name}







                    className="w-16 h-16 rounded-full ring-4 ring-blue-50"







                  />







                <div>



                    <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>







                    <div className="flex items-center space-x-2">







                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>







                      <span className="text-gray-400">•</span>







                      <span className="text-blue-600">{testimonial.role}</span>







                </div>



                  </div>







                </div>







              </motion.div>



            ))}







          </div>



        </motion.section>







        <FAQSection />







        <section className="text-center py-20">



          <h2 className="text-3xl md:text-4xl font-bold mb-8">



            Ready to Transform Your Education?



          </h2>



          <CTAButton />



        </section>



      </main>







      <footer className="bg-gray-50 border-t border-gray-100">







        <div className="container mx-auto px-4 py-12">



          <p className="text-sm md:text-base">&copy; 2024 FideLearn. Empowering Ethiopian Education.</p>



          <p className="text-sm md:text-base">By kirubel</p>



          <div className="mt-3 md:mt-4 space-x-4">



            <a href="#" className="text-xs md:text-sm hover:underline">Privacy Policy</a>



            <a href="#" className="text-xs md:text-sm hover:underline">Terms of Service</a>



            <a href="#" className="text-xs md:text-sm hover:underline">Contact Us</a>



          </div>



        </div>



      </footer>







    </div>







  );







};











export default LandingPage;
