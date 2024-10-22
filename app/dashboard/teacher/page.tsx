import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import TeacherDashboard from '@/components/Dashboard/Teacher/TeacherDashboard';

export default function TeacherDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['teacher']}>
      <DashboardLayout role="teacher">
        <TeacherDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
