'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import StudentCourseDetail from '@/components/Dashboard/Student/StudentCourseDetail';
import DashboardLayout from '@/components/DashboardLayout';

export default function StudentCoursePage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute allowedRoles={['student']}>
      <DashboardLayout role="student">
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <StudentCourseDetail courseId={params.id} />
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
