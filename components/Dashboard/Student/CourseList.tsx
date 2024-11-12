'use client';



import React from 'react';

import Link from 'next/link';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import { Clock, BookOpen, BarChart2 } from 'lucide-react';
import { urlFor } from '@/lib/sanity';




interface Course {

  _id: string;

  title: string;

  description: string;

  coverImage: any;

  price: number;

  duration: number;

  level: string;

  instructor: {

    name: string;

    avatar: any;

  };

  category: {

    name: string;

  };

}



interface CourseListProps {

  courses: Course[];

}



const CourseList: React.FC<CourseListProps> = ({ courses }) => {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {courses.map((course) => (

        <Card key={course._id} className="flex flex-col">

          <div className="relative h-48 w-full">

            {course.coverImage ? (

              <img
                src={urlFor(course.coverImage)}
                alt={course.title}
                className="w-full h-full object-cover rounded-t-lg"

              />

            ) : (

              <div className="w-full h-full bg-gray-200 flex items-center justify-center">

                <BookOpen className="w-12 h-12 text-gray-400" />

              </div>

            )}

          </div>

          <CardHeader>

            <CardTitle className="line-clamp-2">{course.title}</CardTitle>

            <div className="text-sm text-gray-500">

              by {course.instructor?.name || 'Unknown Instructor'}

            </div>

          </CardHeader>

          <CardContent>

            <p className="text-gray-600 line-clamp-2 mb-4">{course.description}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500">

              <span className="flex items-center gap-1">

                <Clock className="w-4 h-4" />

                {course.duration || 0}h

              </span>

              <span className="flex items-center gap-1">

                <BarChart2 className="w-4 h-4" />

                {course.level}

              </span>

              <span className="text-blue-600">{course.category?.name || 'Uncategorized'}</span>

            </div>

          </CardContent>

          <CardFooter className="mt-auto">

            <div className="flex items-center justify-between w-full">

              <span className="text-lg font-bold">${course.price}</span>

              <Link href={`/dashboard/courses/${course._id}`}>

                <Button>View Details</Button>

              </Link>

            </div>

          </CardFooter>

        </Card>

      ))}

    </div>

  );

};



export default CourseList; 






























