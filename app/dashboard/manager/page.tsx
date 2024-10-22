import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import ManagerDashboard from '@/components/Dashboard/Manager/ManagerDashboard';

export default function ManagerDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['manager']}>
      <DashboardLayout role="manager">
        <ManagerDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
