import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import MyLearningPage from '@/components/Dashboard/Student/MyLearning';

export default async function LearningPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return <MyLearningPage userId={userId} />;
} 














