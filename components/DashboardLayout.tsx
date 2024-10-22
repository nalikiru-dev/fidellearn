'use client';



import React, { useState, useEffect } from 'react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { Bell, BookOpen, Calendar, Home, MessageSquare, Settings, User, Menu, X, LogOut } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

import { useClerk } from '@clerk/nextjs';

import { useRouter } from 'next/navigation';



interface NavItem {

  href: string;

  label: string;

  icon: React.ReactNode;

}



interface DashboardLayoutProps {

  children: React.ReactNode;

  role: string;

}



const navItems: NavItem[] = [

  { href: '/dashboard', label: 'Home', icon: <Home size={20} /> },

  { href: '/dashboard/courses', label: 'Courses', icon: <BookOpen size={20} /> },

  { href: '/dashboard/calendar', label: 'Calendar', icon: <Calendar size={20} /> },

  { href: '/dashboard/chat', label: 'Messages', icon: <MessageSquare size={20} /> },

];



const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {

  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const { signOut } = useClerk();

  const router = useRouter();



  useEffect(() => {

    const handleResize = () => {

      setIsMobile(window.innerWidth < 1024);

    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);

  }, []);



  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);



  const handleSignOut = async () => {

    await signOut();

    router.push('/');

  };



  const Sidebar = () => (

    <motion.aside

      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white shadow-lg transform ${

        isSidebarOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'

      } transition-transform duration-300 ease-in-out lg:relative`}

      initial={false}

      animate={isSidebarOpen || !isMobile ? 'open' : 'closed'}

    >

      <div className="flex flex-col h-full">

        <div className="p-4 border-b border-gray-700">

          <h1 className="text-2xl font-bold text-blue-400">FideLearn LMS</h1>

        </div>

        <nav className="flex-grow py-4">

          {navItems.map((item) => (

            <Link

              key={item.href}

              href={item.href === '/dashboard' ? `/dashboard/${role}` : `${item.href}`}

              className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 ${

                pathname === item.href ? 'bg-gray-700 text-white' : ''

              }`}

              onClick={() => isMobile && setIsSidebarOpen(false)}

            >

              {item.icon}

              <span className="ml-2">{item.label}</span>

            </Link>

          ))}

        </nav>

        <div className="p-4 border-t border-gray-700">

          <button

            onClick={handleSignOut}

            className="flex items-center text-gray-300 hover:text-white"

          >

            <LogOut size={20} />

            <span className="ml-2">Sign Out</span>

          </button>

        </div>

      </div>

    </motion.aside>

  );



  return (

    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}

      <Sidebar />



      {/* Main content */}

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}

        <header className="bg-white shadow-sm">

          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">

            <div className="flex items-center">

              {isMobile && (

                <button

                  className="text-gray-500 hover:text-gray-700 mr-2"

                  onClick={toggleSidebar}

                >

                  <Menu size={24} />

                </button>

              )}

              <h2 className="text-xl font-semibold text-gray-800">

                {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard

              </h2>

            </div>

            <div className="flex items-center space-x-4">

              <button className="text-gray-500 hover:text-gray-700">

                <Bell size={20} />

              </button>

              <button className="text-gray-500 hover:text-gray-700">

                <User size={20} />

              </button>

              <button className="text-gray-500 hover:text-gray-700">

                <Settings size={20} />

              </button>

            </div>

          </div>

        </header>



        {/* Page content */}

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">

          {children}

        </main>

      </div>



      {/* Mobile sidebar overlay */}

      {isMobile && isSidebarOpen && (

        <div

          className="fixed inset-0 bg-black bg-opacity-50 z-40"

          onClick={toggleSidebar}

        />

      )}

    </div>

  );

};



export default DashboardLayout;



