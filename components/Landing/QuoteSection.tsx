'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const QuoteSection = () => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 md:p-12 rounded-3xl mb-12 relative overflow-hidden"
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="relative z-10">
        <p className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
          "The performance has improved as compared to the previous two consecutive academic years during which the pass rates were 3.21% and 3.2%, respectively."
        </p>
        <p className="text-blue-600 font-medium">- Education Minister Birhanu</p>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-30 -z-10" />
    </motion.div>
  );
};














