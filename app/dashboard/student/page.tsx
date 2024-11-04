import React from 'react';



import ProtectedRoute from '@/components/ProtectedRoute';



import DashboardLayout from '@/components/DashboardLayout';



import StudentDashboard from '@/components/Dashboard/Student/StudentDashboard';







export default function StudentDashboardPage() {



  return (



    <ProtectedRoute allowedRoles={['student']}>



      <DashboardLayout role="student">



        <StudentDashboard />



      </DashboardLayout>



    </ProtectedRoute>



  );



}






