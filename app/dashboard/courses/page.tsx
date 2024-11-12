import React from 'react';

import { client } from '@/lib/sanity/client';

import CourseList from '@/components/Dashboard/Student/CourseList';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';



async function getAvailableCourses() {

  try {

    const courses = await client.fetch(`

      *[_type == "course"] {

        _id,

        title,

        description,

        coverImage,

        price,

        duration,

        level,

        instructor->{

          name,

          avatar

        },

        category->{

          name

        },

        status

      } | order(title asc)

    `);

    return courses;

  } catch (error) {

    console.error('Error fetching courses:', error);

    return [];

  }

}



export default async function CoursesPage() {

  const courses = await getAvailableCourses();



  return (

    <div className="flex-1 space-y-4 p-8 pt-6">

      <div className="flex items-center justify-between space-y-2">

        <h2 className="text-3xl font-bold tracking-tight">Courses</h2>

      </div>

      <Tabs defaultValue="all" className="space-y-4">

        <TabsList>

          <TabsTrigger value="all">All Courses</TabsTrigger>

          <TabsTrigger value="published">Published</TabsTrigger>

          <TabsTrigger value="draft">Draft</TabsTrigger>

          <TabsTrigger value="archived">Archived</TabsTrigger>

        </TabsList>

        <TabsContent value="all">

          <CourseList courses={courses} />

        </TabsContent>

        <TabsContent value="published">

          <CourseList 
            courses={courses.filter((course: { status: string }) => course.status === 'published')} 
          />

        </TabsContent>

        <TabsContent value="draft">

          <CourseList 
            courses={courses.filter((course: { status: string }) => course.status === 'draft')} 
          />

        </TabsContent>

        <TabsContent value="archived">

          <CourseList 
            courses={courses.filter((course: { status: string }) => course.status === 'archived')} 
          />

        </TabsContent>

      </Tabs>

    </div>

  );

}














