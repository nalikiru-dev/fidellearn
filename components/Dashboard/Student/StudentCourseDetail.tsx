'use client';



import React, { useEffect, useState } from 'react';

import { client } from '@/lib/sanity';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Progress } from '@/components/ui/progress';

import { Button } from '@/components/ui/button';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { CheckCircle, PlayCircle, Lock } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';



interface Lesson {

  _id: string;

  title: string;

  completed: boolean;

  locked?: boolean;

}



interface CourseDetail {

  _id: string;

  title: string;

  description: string;

  progress: number;

  lessons: Lesson[];

}



const StudentCourseDetail: React.FC<{ courseId: string }> = ({ courseId }) => {

  const [course, setCourse] = useState<CourseDetail | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const { showToast } = useToast();



  useEffect(() => {

    const fetchCourseDetail = async () => {

      try {

        const result = await client.fetch(`*[_type == "course" && _id == $courseId][0]{

          _id,

          title,

          description,

          "progress": coalesce(progress, 0),

          "lessons": lessons[]{

            _id,

            title,

            "completed": coalesce(completed, false),

            "locked": coalesce(locked, false)

          }

        }`, { courseId });

        setCourse(result);

      } catch (err) {

        console.error('Error fetching course details:', err);

        showToast({
          title: "Error",
          description: "Failed to fetch course details. Please try again later.",
          type: "error"
        });

      } finally {

        setLoading(false);

      }

    };



    fetchCourseDetail();

  }, [courseId, showToast]);



  const handleLessonAction = (lessonId: string, completed: boolean) => {

    // Here you would update the lesson status in your backend

    console.log(`Lesson ${lessonId} ${completed ? 'completed' : 'started'}`);

  };



  if (loading) {

    return <div className="flex justify-center items-center h-screen">Loading...</div>;

  }



  if (error || !course) {

    return <div className="text-red-500 text-center">Error: {error || 'Course not found'}</div>;

  }



  return (

    <div className="p-6 max-w-4xl mx-auto">

      <Card className="mb-6">

        <CardHeader>

          <CardTitle className="text-2xl">{course.title}</CardTitle>

        </CardHeader>

        <CardContent>

          <p className="mb-4">{course.description}</p>

          <Progress value={course.progress} className="h-2" />

          <p className="mt-2 text-sm text-gray-600">Overall Progress: {course.progress}%</p>

        </CardContent>

      </Card>



      <Card>

        <CardHeader>

          <CardTitle>Lessons</CardTitle>

        </CardHeader>

        <CardContent>

          {course.lessons && course.lessons.length > 0 ? (

            <Accordion type="single" collapsible className="w-full">

              {course.lessons.map((lesson, index) => (

                <AccordionItem key={lesson._id} value={lesson._id}>

                  <AccordionTrigger className="hover:no-underline">

                    <div className="flex items-center justify-between w-full">

                      <span className="flex items-center">

                        {lesson.completed ? (

                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />

                        ) : lesson.locked ? (

                          <Lock className="mr-2 h-5 w-5 text-gray-400" />

                        ) : (

                          <PlayCircle className="mr-2 h-5 w-5 text-blue-500" />

                        )}

                        Lesson {index + 1}: {lesson.title}

                      </span>

                      {!lesson.locked && (

                        <Button

                          size="sm"

                          variant={lesson.completed ? "outline" : "default"}

                          onClick={(e) => {

                            e.stopPropagation();

                            handleLessonAction(lesson._id, !lesson.completed);

                          }}

                        >

                          {lesson.completed ? "Revisit" : "Start"}

                        </Button>

                      )}

                    </div>

                  </AccordionTrigger>

                  <AccordionContent>

                    <p className="text-gray-600">

                      {lesson.locked

                        ? "This lesson is locked. Complete the previous lessons to unlock."

                        : "Lesson content goes here. You can add more details, resources, or interactive elements for each lesson."}

                    </p>

                  </AccordionContent>

                </AccordionItem>

              ))}

            </Accordion>

          ) : (

            <p>No lessons available for this course.</p>

          )}

        </CardContent>

      </Card>

    </div>

  );

};



export default StudentCourseDetail;



