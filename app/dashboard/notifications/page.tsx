import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import NotificationsPage from '@/components/Dashboard/Student/Notifications';

export default async function Notifications() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return <NotificationsPage userId={userId} />;
} 






