'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Users,
  BarChart2,
  Plus,
  FileEdit,
  TrendingUp,
  Clock,
  Award,
  Calendar,
  MessageSquare,
  Activity
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import CourseTable from './CourseTable';
import { client } from '@/lib/sanity/client';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface TeacherDashboardProps {
  userId: string;
}

interface DashboardStats {
  totalCourses: number;
  totalStudents: number;
  averageRating: number;
  draftCourses: number;
  completionRate: number;
  activeStudents: number;
  upcomingClasses: any[];
  recentMessages: any[];
  studentProgress: any[];
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ userId }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    totalStudents: 0,
    averageRating: 0,
    draftCourses: 0,
    completionRate: 0,
    activeStudents: 0,
    upcomingClasses: [],
    recentMessages: [],
    studentProgress: []
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const result = await client.fetch(`
          {
            "totalCourses": count(*[_type == "course" && instructor._ref == $userId]),
            "totalStudents": count(*[_type == "course" && instructor._ref == $userId].enrolledStudents[]),
            "averageRating": avg(*[_type == "course" && instructor._ref == $userId].rating),
            "draftCourses": count(*[_type == "course" && instructor._ref == $userId && status == "draft"]),
            "completionRate": avg(*[_type == "course" && instructor._ref == $userId].completionRate),
            "activeStudents": count(*[_type == "course" && instructor._ref == $userId && status == "active"].enrolledStudents[]),
            "upcomingClasses": *[_type == "class" && instructor._ref == $userId && dateTime > now()][0...5] {
              title,
              dateTime,
              students
            },
            "recentMessages": *[_type == "message" && recipientId == $userId][0...5] {
              content,
              sender->,
              _createdAt
            },
            "studentProgress": *[_type == "studentProgress" && course.instructor._ref == $userId][0...10] {
              student->,
              progress,
              lastActivity
            }
          }
        `, { userId });

        setStats(result);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load dashboard statistics."
        });
      }
    };

    fetchDashboardStats();
  }, [userId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
        <Button onClick={() => router.push('/dashboard/courses/create')}>
          <Plus className="mr-2 h-4 w-4" /> Create Course
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              {stats.draftCourses} drafts in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeStudents} active this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}/5.0</div>
            <Progress value={stats.averageRating * 20} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate.toFixed(1)}%</div>
            <Progress value={stats.completionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Student Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={stats.studentProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="lastActivity" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="progress" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {stats.upcomingClasses.map((class_, i) => (
                    <div key={i} className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{class_.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(class_.dateTime).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {class_.students.length} students
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {stats.recentMessages.map((message, i) => (
                    <div key={i} className="flex items-start">
                      <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {message.sender.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {message.content}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(message._createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full" onClick={() => router.push('/dashboard/courses/create')}>
                    <Plus className="mr-2 h-4 w-4" /> New Course
                  </Button>
                  <Button className="w-full" variant="outline" onClick={() => router.push('/dashboard/calendar')}>
                    <Calendar className="mr-2 h-4 w-4" /> Schedule Class
                  </Button>
                  <Button className="w-full" variant="outline" onClick={() => router.push('/dashboard/messages')}>
                    <MessageSquare className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Your Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <CourseTable userId={userId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {stats.studentProgress.map((progress, i) => (
                  <div key={i} className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div className="ml-4 space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">
                        {progress.student.name}
                      </p>
                      <Progress value={progress.progress} className="mt-2" />
                    </div>
                    <div className="ml-auto font-medium">
                      {progress.progress}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Course Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={stats.studentProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="lastActivity" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="progress" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDashboard;