import ProtectedRoute from '@/components/ProtectedRoute';
import StudentCourseDetail from '@/components/Dashboard/Student/StudentCourseDetail';
import DashboardLayout from '@/components/DashboardLayout';

export default function StudentCoursePage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute allowedRoles={['student']}>
      <DashboardLayout role="student">
        <StudentCourseDetail courseId={params.id} />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
