'use client';



import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { ChevronDown } from 'lucide-react';



interface FAQItemProps {

  question: string;

  answer: string;

}



export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {

  const [isOpen, setIsOpen] = useState(false);



  return (

    <motion.div

      className="border-b border-gray-200 last:border-b-0"

      initial={false}

    >

      <motion.button

        className="flex justify-between items-center w-full py-6 px-6 text-left hover:bg-gray-50 transition-colors"

        onClick={() => setIsOpen(!isOpen)}

      >

        <span className="text-lg font-semibold text-gray-900">{question}</span>

        <motion.div

          animate={{ rotate: isOpen ? 180 : 0 }}

          transition={{ duration: 0.3 }}

        >

          <ChevronDown className="w-6 h-6 text-blue-600" />

        </motion.div>

      </motion.button>

      <AnimatePresence initial={false}>

        {isOpen && (

          <motion.div

            initial="collapsed"

            animate="open"

            exit="collapsed"

            variants={{

              open: { opacity: 1, height: "auto", marginBottom: "16px" },

              collapsed: { opacity: 0, height: 0, marginBottom: "0px" }

            }}

            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}

          >

            <div className="px-6 pb-6 text-gray-600 leading-relaxed">

              {answer}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.div>

  );

};



export const FAQSection = () => {

  const faqs = [

    {

      question: "How does FideLearn improve exam performance?",

      answer: "FideLearn uses AI-powered adaptive learning to identify and address each student's unique strengths and weaknesses. Our platform provides personalized study plans, real-time feedback, and targeted practice questions based on the Ethiopian curriculum."

    },

    {

      question: "Is FideLearn accessible in rural areas?",

      answer: "Yes! We've designed FideLearn with Ethiopia's connectivity challenges in mind. Our platform works offline after initial download, and we're partnering with local schools to provide access points in rural communities."

    },

    {

      question: "What makes FideLearn different from other platforms?",

      answer: "FideLearn is specifically designed for Ethiopian students, with content aligned to the national curriculum. We offer bilingual support (Amharic and English), culturally relevant examples, and a community-driven approach to learning."

    },

    {

      question: "How do you ensure content quality?",

      answer: "Our content is developed by experienced Ethiopian educators and undergoes rigorous review. We regularly update materials based on curriculum changes and student feedback, ensuring high-quality, relevant learning resources."

    },

    {

      question: "What support do you provide for teachers?",

      answer: "Teachers receive comprehensive training, detailed analytics on student performance, and access to our resource library. We also facilitate professional development through workshops and our teacher community network."

    },

    {

      question: "How affordable is FideLearn?",

      answer: "We believe in making quality education accessible. We offer flexible payment plans and work with schools to provide institutional discounts. We also have scholarship programs for high-potential students from disadvantaged backgrounds."

    }

  ];



  return (

    <motion.section 

      id="faq"

      className="mb-20"

      initial="initial"

      animate="animate"

      variants={{

        initial: { opacity: 0 },

        animate: { opacity: 1 }

      }}

    >

      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">

        Frequently Asked Questions

      </h2>

      <motion.div 

        className="max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100"

      >

        {faqs.map((faq, index) => (

          <FAQItem key={index} question={faq.question} answer={faq.answer} />

        ))}

      </motion.div>

    </motion.section>

  );

};






























