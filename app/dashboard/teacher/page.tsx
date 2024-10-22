import ProtectedRoute from '@/components/ProtectedRoute';
import TeacherDashboard from '@/components/Dashboard/Teacher/TeacherDashboard';
import DashboardLayout from '@/components/DashboardLayout';

export default function TeacherDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['teacher']}>
      <DashboardLayout role="teacher">
        <TeacherDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
