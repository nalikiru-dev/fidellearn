import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { Toaster } from '@/components/ui/toaster';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <DashboardLayout role="student">
      {children}
      <Toaster />
    </DashboardLayout>
  );
} 