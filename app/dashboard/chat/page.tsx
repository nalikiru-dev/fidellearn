import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import Chat from '@/components/app-chat-page';

export default function ChatPage() {
  return (
    <ProtectedRoute allowedRoles={['student', 'teacher', 'staff', 'manager']}>
      <DashboardLayout role="user">
        <Chat />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
