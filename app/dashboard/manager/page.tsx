import ProtectedRoute from '@/components/ProtectedRoute';
import ManagerDashboard from '@/components/Dashboard/Manager/ManagerDashboard';
import DashboardLayout from '@/components/DashboardLayout';

export default function ManagerDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['manager']}>
      <DashboardLayout role="manager">
        <ManagerDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
