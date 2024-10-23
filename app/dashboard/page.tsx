'use server';















import { useUser } from "@clerk/nextjs";







import { useRouter } from 'next/navigation';







import { useEffect } from 'react';







import { getDashboardRoute } from '@/lib/utils';



import { getUserRole } from '@/lib/getUserRole';



import { redirect } from 'next/navigation';















export default async function DashboardPage() {
  const role = await getUserRole();

  if (!role) {
    redirect('/sign-in');
  }

  switch (role) {
    case 'student':
      redirect('/dashboard/student');
    case 'teacher':
      redirect('/dashboard/teacher');
    case 'staff':
      redirect('/dashboard/staff');
    case 'manager':
      redirect('/dashboard/manager');
    default:
      redirect('/dashboard/general');
  }
}






