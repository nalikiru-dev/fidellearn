'use client';



import React from 'react';


import StudentCourseDetail from '@/components/Dashboard/Student/StudentCourseDetail';



export default function StudentCoursePage({ params }: { params: { id: string } }) {

  return (

            <StudentCourseDetail courseId={params.id} />


  );

}


