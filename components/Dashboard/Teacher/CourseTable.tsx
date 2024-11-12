'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, FileEdit, Trash2, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { client } from '@/lib/sanity/client';
import { toast } from '@/components/ui/use-toast';

interface Course {
  _id: string;
  title: string;
  status: 'draft' | 'published' | 'archived';
  enrolledStudents?: string[];
  updatedAt: string;
}

interface CourseTableProps {
  userId: string;
}

const CourseTable: React.FC<CourseTableProps> = ({ userId }) => {
  const router = useRouter();
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "course" && instructor._ref == $userId] {
            _id,
            title,
            status,
            enrolledStudents,
            _updatedAt
          } | order(_updatedAt desc)
        `, { userId });

        setCourses(result);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast({
          title: "Error",
          description: "Failed to fetch courses",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async (courseId: string) => {
    try {
      await client.delete(courseId);
      setCourses(courses.filter(course => course._id !== courseId));
      toast({
        description: "Course deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading courses...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Students</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course._id}>
            <TableCell className="font-medium">{course.title}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                  course.status
                )}`}
              >
                {course.status}
              </span>
            </TableCell>
            <TableCell>{course.enrolledStudents?.length || 0}</TableCell>
            <TableCell>{new Date(course.updatedAt).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => router.push(`/dashboard/teacher/courses/${course._id}`)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push(`/dashboard/teacher/courses/${course._id}/edit`)}
                  >
                    <FileEdit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(course._id)}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CourseTable; 














