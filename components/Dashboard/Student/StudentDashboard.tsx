'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { client } from '@/lib/sanity';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, Clock, AlertTriangle, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Course {
  _id: string;
  title: string;
  description: string;
  subjects: string[] | null;
  progress?: number;
}

interface Assignment {
  id: string;
  title: string;
  dueDate: Date;
}

const StudentDashboard: React.FC = () => {
  const { user } = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await client.fetch(`*[_type == "course"]{
          _id,
          title,
          description,
          subjects,
          "progress": coalesce(progress, 0)
        }`);
        setCourses(result);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to fetch courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchAssignments = async () => {
      // In a real-world scenario, you'd fetch this from Sanity as well
      setAssignments([
        { id: '1', title: 'React Hooks Essay', dueDate: new Date('2023-06-15') },
        { id: '2', title: 'JavaScript Algorithms', dueDate: new Date('2023-06-20') },
      ]);
    };

    fetchCourses();
    fetchAssignments();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading your awesome dashboard...</div>;
  }

  const totalProgress = courses.reduce((sum, course) => sum + (course.progress || 0), 0) / courses.length;

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg md:text-xl">Welcome back, {user?.firstName}!</span>
            <Avatar 
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleProfileClick}
            >
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || ''} />
              <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
            </Avatar>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base">You have {courses.length} courses and {assignments.length} upcoming assignments.</p>
          <Progress value={totalProgress} className="mt-4 bg-white/20" />
          <p className="mt-2 text-xs md:text-sm">Overall Progress: {totalProgress.toFixed(1)}%</p>
          {error && <p className="text-red-300 mt-2 text-xs md:text-sm"><AlertTriangle className="inline mr-2" />{error}</p>}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg md:text-xl"><BookOpen className="mr-2" />Your Courses</CardTitle>
            </CardHeader>
            <CardContent>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div key={course._id} className="mb-4 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-base md:text-lg">{course.title}</h3>
                    <p className="text-xs md:text-sm text-gray-500">{course.description}</p>
                    {course.subjects && course.subjects.length > 0 && (
                      <p className="text-xs text-gray-400 mt-1">
                        Subjects: {course.subjects.join(', ')}
                      </p>
                    )}
                    <Progress value={course.progress} className="mt-2" />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs md:text-sm text-gray-500">Progress: {course.progress}%</span>
                      <Link href={`/dashboard/student/courses/${course._id}`}>
                        <Button variant="outline" size="sm">View Course</Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm md:text-base">No courses available at the moment. Check back later for exciting new content!</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg md:text-xl"><Clock className="mr-2" />Upcoming Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              {assignments.map((assignment) => (
                <div key={assignment.id} className="mb-2 p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-sm md:text-base">{assignment.title}</p>
                  <p className="text-xs md:text-sm text-gray-500">
                    Due: {assignment.dueDate.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar className="w-full" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Button className="bg-green-500 hover:bg-green-600 text-sm md:text-base">Join Live Class</Button>
              <Button variant="outline" className="text-sm md:text-base">Message Tutor</Button>
              <Link href="/dashboard/student/chat">
                <Button variant="outline" className="w-full text-sm md:text-base">Open Chat</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
