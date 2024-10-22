import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import StaffDashboard from '@/components/Dashboard/Staff/StaffDashboard';

export default function StaffDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['staff']}>
      <DashboardLayout role="staff">
        <StaffDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
