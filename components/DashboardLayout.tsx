'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { UserButton } from "@clerk/nextjs";
import {
    LayoutDashboard, BookOpen, GraduationCap, Calendar,
    Users, Settings, BarChart, FileText, MessagesSquare,
    HelpCircle, LogOut, Bell, Menu, X, Search,
    Rocket, Brain, Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

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

const helpLinks = [
  { title: 'Getting Started', icon: Rocket, href: '/dashboard/help?section=overview', variant: 'ghost' },
  { title: 'FAQ', icon: HelpCircle, href: '/dashboard/help?section=faq', variant: 'ghost' }
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const router = useRouter();
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

  const NavigationContent = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-2">
        <Brain className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Fidelearn</h2>
      </div>

      {/* Navigation Sections */}
      <div className="space-y-6">
        <div>
          <h3 className="px-4 text-sm font-semibold text-muted-foreground mb-2">Main</h3>
          <nav className="space-y-1">
            {mainLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={cn(
                  "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors",
                  pathname === link.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}>
                  <link.icon className="w-4 h-4" />
                  {link.title}
                  {link.badge && (
                    <span className="ml-auto bg-primary-foreground/10 px-2 py-0.5 rounded-full text-xs">
                      {link.badge}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="px-4 text-sm font-semibold text-muted-foreground mb-2">Learning</h3>
          <nav className="space-y-1">
            {learningLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={cn(
                  "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors",
                  pathname === link.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}>
                  <link.icon className="w-4 h-4" />
                  {link.title}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="px-4 text-sm font-semibold text-muted-foreground mb-2">Community</h3>
          <nav className="space-y-1">
            {communityLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={cn(
                  "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors",
                  pathname === link.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}>
                  <link.icon className="w-4 h-4" />
                  {link.title}
                  {link.badge && (
                    <span className="ml-auto bg-primary-foreground/10 px-2 py-0.5 rounded-full text-xs">
                      {link.badge}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="px-4 text-sm font-semibold text-muted-foreground mb-2">Help & Support</h3>
          <nav className="space-y-1">
            {helpLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={cn(
                  "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors",
                  pathname === link.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}>
                  <link.icon className="w-4 h-4" />
                  {link.title}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom section */}
      <div className="space-y-2">
        <Link href="/dashboard/settings">
          <span className={cn(
            "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors",
            pathname === '/dashboard/settings' ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          )}>
            <Settings className="w-4 h-4" />
            Settings
          </span>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start px-4"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar for desktop */}
        <aside className="hidden lg:block w-72 fixed inset-y-0 z-50 border-r bg-background">
          <div className="flex h-14 items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Fidelearn</span>
            </Link>
          </div>
          <ScrollArea className="h-[calc(100vh-3.5rem)] py-6 pr-4 pl-6">
            <NavigationContent />
          </ScrollArea>
        </aside>

        {/* Main content wrapper */}
        <div className="flex-1 lg:pl-72">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center gap-4">
              <div className="flex items-center gap-4 lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-72 p-0">
                    <ScrollArea className="h-full px-4 py-6">
                      <NavigationContent />
                    </ScrollArea>
                  </SheetContent>
                </Sheet>
                <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
                  <Brain className="h-5 w-5 text-primary" />
                  <span className="font-bold">Fidelearn</span>
                </Link>
              </div>

              <div className="flex-1 flex items-center justify-end gap-4">
                <div className="w-full max-w-sm">
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <Input
                      placeholder="Search anything..."
                      className="w-full pl-9 pr-4 bg-muted/50 border-muted-foreground/20 hover:bg-muted focus:bg-background transition-colors"
                    />
                  </div>
                </div>
                <nav className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
                    <span className="sr-only">Notifications</span>
                  </Button>
                  <div className="h-5 w-px bg-border/50" />
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "h-8 w-8"
                      }
                    }}
                  />
                </nav>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="min-h-[calc(100vh-3.5rem)]">
            <div className="container py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;