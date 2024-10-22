import ProtectedRoute from '@/components/ProtectedRoute';
import StudentDashboard from '@/components/Dashboard/Student/StudentDashboard';
import DashboardLayout from '@/components/DashboardLayout';

export default function StudentDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['student']}>
      <DashboardLayout role="student">
        <StudentDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
