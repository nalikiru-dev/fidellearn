'use client';



import React from 'react';

import { motion } from 'framer-motion';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import Link from 'next/link';



interface MobileMenuProps {

  isOpen: boolean;

  onClose: () => void;

  navItems: Array<{ name: string; href: string; }>;

}



export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navItems }) => {

  return (

    <motion.div

      initial={{ x: '100%' }}

      animate={{ x: isOpen ? 0 : '100%' }}

      transition={{ type: 'tween', duration: 0.3 }}

      className="fixed inset-y-0 right-0 w-full md:w-80 bg-white shadow-2xl z-50"

    >

      <div className="flex flex-col h-full">

        <div className="flex justify-end p-6 border-b border-gray-100">

          <Button

            variant="ghost"

            size="icon"

            onClick={onClose}

            className="text-gray-600 hover:text-gray-900"

          >

            <X className="h-6 w-6" />

          </Button>

        </div>

        <nav className="flex-1 px-6 py-8">

          <div className="space-y-6">

            {navItems.map((item, index) => (

              <Link

                key={index}

                href={item.href}

                className="block text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors"

                onClick={onClose}

              >

                {item.name}

              </Link>

            ))}

          </div>

        </nav>

        <div className="p-6 border-t border-gray-100">

          <Link href="/sign-in" className="w-full">

            <Button 

              className="w-full bg-blue-600 hover:bg-blue-700 text-white"

              onClick={onClose}

            >

              Sign In

            </Button>

          </Link>

        </div>

      </div>

    </motion.div>

  );

};














