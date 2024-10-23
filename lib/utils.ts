import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { User } from "@clerk/nextjs/dist/types/server"
import { UserResource } from "@clerk/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDashboardRoute(user: User | UserResource | null): string {
  if (!user) return '/';

  // Assuming the role is stored in publicMetadata
  const role = (user.publicMetadata?.role as string) || 'student';

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
