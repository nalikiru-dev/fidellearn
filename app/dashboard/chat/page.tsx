import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import Chat from '@/components/app-chat-page';
import { useUser } from '@clerk/nextjs';

export default function ChatPage() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role as string || 'student';

  return (
    <ProtectedRoute allowedRoles={['student', 'teacher', 'staff', 'manager']}>
      <DashboardLayout role={role}>
        <Chat />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
