import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import ResourcesPage from '@/components/Dashboard/Student/Resources';

export default async function Resources() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return <ResourcesPage />;
} 






























