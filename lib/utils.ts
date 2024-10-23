import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { User } from "@clerk/nextjs/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDashboardRoute(user: User | null): string {
  if (!user) return '/';

  // Assuming the user's role is stored in public metadata
  const role = user.publicMetadata.role as string | undefined;

  switch (role) {
    case 'student':
      return '/dashboard/student';
    case 'instructor':
      return '/dashboard/instructor';
    case 'admin':
      return '/dashboard/admin';
    default:
      return '/dashboard'; // Default dashboard route
  }
}
