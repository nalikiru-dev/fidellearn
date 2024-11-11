'use client';



import React from 'react';

import { motion } from 'framer-motion';

import Link from 'next/link';

import { Button } from '@/components/ui/button';



export const CTAButton = () => {

  return (

    <motion.div

      whileHover={{ scale: 1.05 }}

      whileTap={{ scale: 0.95 }}

    >

      <Link href="/sign-up">

        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">

          Join the Educational Revolution

        </Button>

      </Link>

    </motion.div>

  );

};






























