'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Users,
  BarChart2,
  Plus,
  FileEdit
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import CourseTable from './CourseTable';
import { client } from '@/lib/sanity/client';

interface TeacherDashboardProps {
  userId: string;
}

interface DashboardStats {
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
  draftCourses: number;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ userId }) => {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    totalStudents: 0,
    averageRating: 0,
    draftCourses: 0
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const result = await client.fetch(`
          {
            "totalCourses": count(*[_type == "course" && instructor._ref == $userId]),
            "totalStudents": count(*[_type == "course" && instructor._ref == $userId].enrolledStudents[]),
            "averageRating": avg(*[_type == "course" && instructor._ref == $userId].rating),
            "draftCourses": count(*[_type == "course" && instructor._ref == $userId && status == "draft"])
          }
        `, { userId });

        setStats(result);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchDashboardStats();
  }, [userId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
        <Button onClick={() => router.push('/dashboard/teacher/courses/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Course
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Courses</p>
              <h3 className="text-2xl font-bold">{stats.totalCourses}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <h3 className="text-2xl font-bold">{stats.totalStudents}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <h3 className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <FileEdit className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Draft Courses</p>
              <h3 className="text-2xl font-bold">{stats.draftCourses}</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Your Courses</h3>
            <CourseTable userId={userId} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;






























































































































