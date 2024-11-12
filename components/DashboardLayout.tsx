'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard, BookOpen, GraduationCap, Calendar,
    Users, Settings, BarChart, FileText, MessagesSquare,
    HelpCircle, LogOut, Bell, Menu, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: string;
}

const mainLinks = [
  { title: 'Overview', icon: LayoutDashboard, href: '/dashboard', variant: 'default' },
  { title: 'Courses', icon: BookOpen, href: '/dashboard/courses', variant: 'ghost', badge: '3' },
  { title: 'Calendar', icon: Calendar, href: '/dashboard/calendar', variant: 'ghost' },
  { title: 'Chat', icon: MessagesSquare, href: '/dashboard/chat', variant: 'ghost', badge: '2' }
];

const learningLinks = [
  { title: 'My Learning', icon: GraduationCap, href: '/dashboard/learning', variant: 'ghost' },
  { title: 'Progress', icon: BarChart, href: '/dashboard/progress', variant: 'ghost' },
  { title: 'Resources', icon: FileText, href: '/dashboard/resources', variant: 'ghost' }
];

const communityLinks = [
  { title: 'Community', icon: Users, href: '/dashboard/community', variant: 'ghost' },
  { title: 'Notifications', icon: Bell, href: '/dashboard/notifications', variant: 'ghost', badge: '5' }
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const LinkButton = ({ item }: { item: any }) => (
    <Link href={item.href === '/dashboard' ? `/dashboard/${role}` : item.href}>
      <Button
        variant={pathname === item.href ? 'secondary' : 'ghost'}
        className={cn(
          'w-full justify-start gap-2',
          pathname === item.href ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'
        )}
      >
        <item.icon className="h-4 w-4" />
        <span>{item.title}</span>
        {item.badge && (
          <span className="ml-auto bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
            {item.badge}
          </span>
        )}
      </Button>
    </Link>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        <motion.aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-gray-800',
            'transform transition-transform duration-300 ease-in-out lg:relative',
            isSidebarOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'
          )}
          initial={false}
          animate={isSidebarOpen || !isMobile ? 'open' : 'closed'}
        >
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b border-gray-700">
            <Link href={`/dashboard/${role}`} className="flex items-center gap-2">
              <div className="rounded-lg bg-primary p-1">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="font-bold text-xl text-white">FideLearn</span>
            </Link>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4 py-6">
            <div className="space-y-6">
              {[
                { title: 'Main', links: mainLinks },
                { title: 'Learning', links: learningLinks },
                { title: 'Community', links: communityLinks },
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <nav className="mt-2 space-y-1">
                    {section.links.map((item) => (
                      <LinkButton key={item.href} item={item} />
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t border-gray-700 p-4">
            <nav className="space-y-2">
              {[
                { href: '/dashboard/settings', icon: Settings, title: 'Settings' },
                { href: '/help', icon: HelpCircle, title: 'Help Center' },
              ].map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Button>
                </Link>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </Button>
            </nav>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <main className="h-screen overflow-y-auto bg-gray-100">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile controls */}
      {isMobile && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="fixed bottom-4 right-4 z-50 rounded-full bg-primary text-white shadow-lg"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
