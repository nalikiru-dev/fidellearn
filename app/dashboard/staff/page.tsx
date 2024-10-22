import ProtectedRoute from '@/components/ProtectedRoute';
import StaffDashboard from '@/components/Dashboard/Staff/StaffDashboard';
import DashboardLayout from '@/components/DashboardLayout';

export default function StaffDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['staff']}>
      <DashboardLayout role="staff">
        <StaffDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
