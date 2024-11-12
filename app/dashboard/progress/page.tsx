import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import ProgressPage from '@/components/Dashboard/Student/Progress';

export default async function Progress() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return <ProgressPage userId={userId} />;
} 














