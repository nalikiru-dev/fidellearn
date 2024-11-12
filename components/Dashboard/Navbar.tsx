'use client';



import React, { useState, useEffect } from 'react';

import { useRouter, usePathname } from 'next/navigation';

import { UserButton } from "@clerk/nextjs";

import { 

  Bell, 

  Search, 

  Settings,

  User,

  Lock,

  BellRing,

  HelpCircle,

  LogOut,

  CheckCircle,

  AlertCircle,

  Info

} from 'lucide-react';

import { Input } from '@/components/ui/input';

import {

  DropdownMenu,

  DropdownMenuContent,

  DropdownMenuItem,

  DropdownMenuLabel,

  DropdownMenuSeparator,

  DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu";

import { Button } from '@/components/ui/button';

import { toast } from '@/components/ui/use-toast';

import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { client } from '@/lib/sanity/client';



interface SearchResult {

  _id: string;

  title: string;

  description: string;

  instructor: {

    name: string;

  };

  category: {

    name: string;

  };

}



const Navbar = () => {

  const [open, setOpen] = useState(false);

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const router = useRouter();



  // Search functionality

  const handleSearch = async (query: string) => {

    if (query.length < 2) {

      setSearchResults([]);

      return;

    }



    try {

      const results = await client.fetch(`

        *[_type == "course" && (

          title match $query + "*" ||

          description match $query + "*" ||

          category->name match $query + "*"

        )] {

          _id,

          title,

          description,

          instructor->{

            name

          },

          category->{

            name

          }

        }[0...5]

      `, { params: { query } });

      setSearchResults(results);

    } catch (error) {

      console.error('Search error:', error);

    }

  };



  useEffect(() => {

    const down = (e: KeyboardEvent) => {

      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {

        e.preventDefault();

        setOpen((open) => !open);

      }

    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);

  }, []);



  return (

    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

      <div className="flex h-14 items-center px-4 lg:px-8">

        <div className="flex flex-1 items-center justify-between space-x-4">

          {/* Search */}

          <div className="w-full max-w-[600px]">

            <Button

              variant="outline"

              className="relative h-9 w-full justify-start text-sm text-muted-foreground"

              onClick={() => setOpen(true)}

            >

              <Search className="mr-2 h-4 w-4" />

              <span>Search courses...</span>

              <kbd className="pointer-events-none absolute right-1.5 top-[50%] translate-y-[-50%] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">

                <span className="text-xs">⌘</span>K

              </kbd>

            </Button>

          </div>



          {/* Right side items */}

          <div className="flex items-center gap-4">

            {/* Notifications */}

            <DropdownMenu>

              <DropdownMenuTrigger asChild>

                <Button variant="ghost" size="icon" className="relative h-9 w-9">

                  <Bell className="h-4 w-4" />

                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />

                </Button>

              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-[380px]">

                <div className="flex items-center justify-between p-2">

                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>

                  <Button variant="ghost" size="sm">

                    Mark all as read

                  </Button>

                </div>

                <DropdownMenuSeparator />

                {/* Add notification items here */}

              </DropdownMenuContent>

            </DropdownMenu>



            {/* Settings */}

            <DropdownMenu>

              <DropdownMenuTrigger asChild>

                <Button variant="ghost" size="icon" className="h-9 w-9">

                  <Settings className="h-4 w-4" />

                </Button>

              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">

                <DropdownMenuLabel>Settings</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>

                  <User className="mr-2 h-4 w-4" />

                  Profile

                </DropdownMenuItem>

                <DropdownMenuItem>

                  <Lock className="mr-2 h-4 w-4" />

                  Security

                </DropdownMenuItem>

                <DropdownMenuItem>

                  <BellRing className="mr-2 h-4 w-4" />

                  Notifications

                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>

                  <HelpCircle className="mr-2 h-4 w-4" />

                  Help

                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>



            {/* User Menu */}

            <UserButton 

              afterSignOutUrl="/sign-in"

              appearance={{

                elements: {

                  avatarBox: "h-8 w-8"

                }

              }}

            />

          </div>

        </div>

      </div>



      {/* Search Dialog */}

      <Dialog open={open} onOpenChange={setOpen}>

        <DialogContent className="p-0 max-w-2xl">

          <Command>

            <CommandInput 

              placeholder="Search courses..." 

              onValueChange={handleSearch}

            />

            <CommandList>

              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup heading="Courses">

                {searchResults.map((course) => (

                  <CommandItem

                    key={course._id}

                    onSelect={() => {

                      router.push(`/dashboard/courses/${course._id}`);

                      setOpen(false);

                    }}

                  >

                    <div className="flex flex-col">

                      <span className="font-medium">{course.title}</span>

                      <span className="text-sm text-muted-foreground">

                        {course.category.name} • {course.instructor.name}

                      </span>

                    </div>

                  </CommandItem>

                ))}

              </CommandGroup>

            </CommandList>

          </Command>

        </DialogContent>

      </Dialog>

    </nav>

  );

};



export default Navbar;














