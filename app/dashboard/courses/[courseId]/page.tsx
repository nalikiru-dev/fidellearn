import StudentCourseDetail from '@/components/Dashboard/Student/StudentCourseDetail';

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  return <StudentCourseDetail courseId={params.courseId} />;
} 