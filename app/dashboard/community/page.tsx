import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import CommunityPage from '@/components/Dashboard/Student/Community';

export default async function Community() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return <CommunityPage userId={userId} />;
}














