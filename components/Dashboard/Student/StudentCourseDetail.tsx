'use client';















import React, { useEffect, useState } from 'react';







import { client } from '@/lib/sanity';







import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';







import { Button } from '@/components/ui/button';







import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';







import { CheckCircle, PlayCircle, Clock, BookOpen, BarChart2, DollarSign } from 'lucide-react';







import { useToast } from '@/hooks/use-toast';















// Interfaces matching Sanity schema







interface SanityReference {







  _ref: string;







  _type: string;







}















interface SanityImage {







  _type: 'image';







  asset: {







    _ref: string;







    _type: 'reference';







    url: string;







  };







  hotspot?: boolean;







}















interface Instructor {







  _id: string;







  name: string;







  email: string;







  bio: string;







  avatar: SanityImage;







  expertise: string[];







  clerkUserId: string;







}















interface Module {







  _id: string;







  title: string;







  description: string;







  lessons: Lesson[];







  order: number;







}















interface Resource {







  title: string;







  url: string;







}















interface Lesson {







  _id: string;







  title: string;







  description: string;







  videoUrl: string;







  content: any[]; // For rich text content







  resources: Resource[];







  duration: number;







}















interface Category {







  _id: string;







  name: string;







  description: string;







}















interface CourseDetail {







  _id: string;







  title: string;







  slug: { current: string };







  instructor: Instructor;







  description: string;







  coverImage: SanityImage;







  price: number;







  duration: number;







  modules: Module[];







  category: Category;







  level: 'beginner' | 'intermediate' | 'advanced';







  enrolledStudents: string[];







  status: 'draft' | 'published' | 'archived';







  prerequisites: string[];







  objectives: string[];







}















const StudentCourseDetail: React.FC<{ courseId: string }> = ({ courseId }) => {







  const [course, setCourse] = useState<CourseDetail | null>(null);







  const [loading, setLoading] = useState(true);







  const [isEnrolled, setIsEnrolled] = useState(false);







  const { showToast } = useToast();















  useEffect(() => {







    const fetchCourseDetail = async () => {







      try {







        const result = await client.fetch(`







          *[_type == "course" && _id == $courseId][0]{







            _id,







            title,







            slug,







            description,







            instructor->{







              _id,







              name,







              email,







              bio,







              avatar,







              expertise,







              clerkUserId







            },







            coverImage,







            price,







            duration,







            modules[]->{







              _id,







              title,







              description,







              order,







              lessons[]->{







                _id,







                title,







                description,







                videoUrl,







                content,







                resources,







                duration







              }







            },







            category->{







              _id,







              name,







              description







            },







            level,







            enrolledStudents,







            status,







            prerequisites,







            objectives







          }







        `, { courseId });















        setCourse(result);







        // Check if the current user is enrolled







        if (result?.enrolledStudents) {







          // You can get the current user's ID from Clerk here







          const userId = "current-user-id"; // Replace with actual user ID







          setIsEnrolled(result.enrolledStudents.includes(userId));







        }







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















  const handleEnrollment = async () => {







    try {







      // Add enrollment logic here







      const userId = "current-user-id"; // Replace with actual user ID







      await client







        .patch(courseId)







        .setIfMissing({ enrolledStudents: [] })







        .append('enrolledStudents', [userId])







        .commit();















      setIsEnrolled(true);







      showToast({







        title: "Success",







        description: "You have successfully enrolled in this course!",







        type: "success"







      });







    } catch (error) {







      console.error('Error enrolling in course:', error);







      showToast({







        title: "Error",







        description: "Failed to enroll in the course. Please try again.",







        type: "error"







      });







    }







  };















  const handleStartLesson = async (lessonId: string) => {







    try {







      // Add lesson start logic here







      showToast({







        title: "Starting lesson",







        description: "Preparing your learning experience...",







        type: "info"







      });







      // Navigate to lesson page or open video player







    } catch (error) {







      showToast({







        title: "Error",







        description: "Failed to start the lesson. Please try again.",







        type: "error"







      });







    }







  };















  if (loading) {







    return (







      <div className="flex justify-center items-center min-h-screen">







        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>







      </div>







    );







  }















  if (!course) {







    return (







      <div className="flex justify-center items-center min-h-screen">







        <div className="text-xl text-gray-600">Course not found</div>







      </div>







    );







  }















  return (







    <div className="p-6 max-w-7xl mx-auto">







      {/* Course Header */}







      <Card className="mb-8">







        <div className="relative h-[300px] rounded-t-lg overflow-hidden">







          {course.coverImage?.asset?.url ? (







            <img







              src={course.coverImage.asset.url}







              alt={course.title}







              className="w-full h-full object-cover"







            />







          ) : (







            <div className="w-full h-full bg-gray-200 flex items-center justify-center">







              <BookOpen className="w-16 h-16 text-gray-400" />







            </div>







          )}







          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />







          <div className="absolute bottom-0 left-0 p-6 text-white">







            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>







            <div className="flex items-center gap-4 text-sm">







              <span className="flex items-center gap-1">







                <Clock className="w-4 h-4" />







                {course.duration || 0} hours







              </span>







              <span className="flex items-center gap-1">







                <BookOpen className="w-4 h-4" />







                {course.modules?.length || 0} modules







              </span>







              <span className="flex items-center gap-1">







                <BarChart2 className="w-4 h-4" />







                {course.level || 'N/A'}







              </span>







              <span className="flex items-center gap-1">







                <DollarSign className="w-4 h-4" />







                ${course.price || 0}







              </span>







            </div>







          </div>







        </div>







      </Card>















      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">







        <div className="lg:col-span-2 space-y-8">







          {/* Course Description */}







          <Card>







            <CardHeader>







              <CardTitle>About This Course</CardTitle>







            </CardHeader>







            <CardContent>







              <p className="text-gray-700">{course.description}</p>







            </CardContent>







          </Card>















          {/* Category Information */}







          <Card>







            <CardHeader>







              <CardTitle>Course Category</CardTitle>







            </CardHeader>







            <CardContent>







              <div className="space-y-2">







                <h3 className="font-semibold text-lg">{course.category?.name || 'Uncategorized'}</h3>







                <p className="text-gray-600">{course.category?.description || 'No category description available'}</p>







              </div>







            </CardContent>







          </Card>















          {/* Learning Objectives */}







          {course.objectives && course.objectives.length > 0 && (







            <Card>







              <CardHeader>







                <CardTitle>What You'll Learn</CardTitle>







              </CardHeader>







              <CardContent>







                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">







                  {course.objectives.map((objective, index) => (







                    <li key={index} className="flex items-start gap-2">







                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />







                      <span>{objective}</span>







                    </li>







                  ))}







                </ul>







              </CardContent>







            </Card>







          )}















          {/* Prerequisites */}







          {course.prerequisites && course.prerequisites.length > 0 && (







            <Card>







              <CardHeader>







                <CardTitle>Prerequisites</CardTitle>







              </CardHeader>







              <CardContent>







                <ul className="space-y-2">







                  {course.prerequisites.map((prerequisite, index) => (







                    <li key={index} className="flex items-start gap-2">







                      <CheckCircle className="w-5 h-5 text-blue-500 shrink-0" />







                      <span>{prerequisite}</span>







                    </li>







                  ))}







                </ul>







              </CardContent>







            </Card>







          )}















          {/* Course Content/Modules */}







          <Card>







            <CardHeader>







              <CardTitle>Course Content</CardTitle>







            </CardHeader>







            <CardContent>







              <div className="mb-4">







                <p className="text-sm text-gray-600">







                  {course.modules?.length || 0} modules • {course.duration || 0} total hours • {







                    course.modules?.reduce((acc, module) => 







                      acc + (module.lessons?.length || 0), 0







                    ) || 0







                  } lessons







                </p>







              </div>







              <Accordion type="single" collapsible className="w-full">







                {course.modules?.sort((a, b) => (a.order || 0) - (b.order || 0)).map((module, moduleIndex) => (







                  <AccordionItem key={module._id} value={module._id}>







                    <AccordionTrigger className="hover:no-underline">







                      <div className="flex items-center gap-2">







                        <span className="font-semibold">







                          Module {moduleIndex + 1}: {module.title}







                        </span>







                        <span className="text-sm text-gray-500">







                          ({module.lessons?.length || 0} lessons)







                        </span>







                      </div>







                    </AccordionTrigger>







                    <AccordionContent>







                      <div className="space-y-4">







                        <p className="text-gray-600 pl-4">{module.description}</p>







                        <div className="space-y-2 pl-4">







                          {module.lessons?.map((lesson, lessonIndex) => (







                            <div







                              key={lesson._id}







                              className="flex flex-col gap-2 p-3 hover:bg-gray-50 rounded-lg border"







                            >







                              <div className="flex items-center justify-between">







                                <div className="flex items-center gap-2">







                                  <PlayCircle className="w-4 h-4 text-blue-600" />







                                  <span className="font-medium">







                                    {lessonIndex + 1}. {lesson.title}







                                  </span>







                                </div>







                                <div className="flex items-center gap-4">







                                  <span className="text-sm text-gray-500">







                                    {lesson.duration} min







                                  </span>







                                  {isEnrolled ? (







                                    <Button 







                                      variant="outline" 







                                      size="sm"







                                      onClick={() => handleStartLesson(lesson._id)}







                                    >







                                      Start Lesson







                                    </Button>







                                  ) : (







                                    <Button 







                                      variant="outline" 







                                      size="sm" 







                                      disabled







                                    >







                                      Enroll to Start







                                    </Button>







                                  )}







                                </div>







                              </div>







                              {/* Lesson details */}







                              <div className="text-sm text-gray-600 pl-6">







                                <p>{lesson.description}</p>







                                {lesson.resources && lesson.resources.length > 0 && (







                                  <div className="mt-2">







                                    <p className="font-medium text-gray-700">Resources:</p>







                                    <ul className="list-disc pl-4">







                                      {lesson.resources.map((resource, idx) => (







                                        <li key={idx}>







                                          <a 







                                            href={resource.url}







                                            target="_blank"







                                            rel="noopener noreferrer"







                                            className="text-blue-600 hover:underline"







                                          >







                                            {resource.title}







                                          </a>







                                        </li>







                                      ))}







                                    </ul>







                                  </div>







                                )}







                              </div>







                            </div>







                          ))}







                        </div>







                      </div>







                    </AccordionContent>







                  </AccordionItem>







                ))}







              </Accordion>







            </CardContent>







          </Card>







        </div>















        <div className="space-y-8">







          {/* Enrollment Card */}







          <Card>







            <CardHeader>







              <CardTitle>Course Access</CardTitle>







            </CardHeader>







            <CardContent>







              <div className="space-y-4">







                <div className="flex justify-between items-center">







                  <div className="text-2xl font-bold">${course.price}</div>







                  <div className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-800">







                    {course.status}







                  </div>







                </div>







                {!isEnrolled ? (







                  <Button 







                    className="w-full" 







                    onClick={handleEnrollment}







                    disabled={course.status !== 'published'}







                  >







                    Enroll Now







                  </Button>







                ) : (







                  <Button className="w-full" variant="outline">







                    Continue Learning







                  </Button>







                )}







                {course.status !== 'published' && (







                  <p className="text-sm text-red-500">







                    This course is currently not available for enrollment.







                  </p>







                )}







              </div>







            </CardContent>







          </Card>















          {/* Instructor Card */}







          <Card>







            <CardHeader>







              <CardTitle>Instructor</CardTitle>







            </CardHeader>







            <CardContent>







              <div className="flex items-center gap-4">







                {course.instructor?.avatar?.asset?.url ? (







                  <img







                    src={course.instructor.avatar.asset.url}







                    alt={course.instructor.name}







                    className="w-16 h-16 rounded-full object-cover"







                  />







                ) : (







                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">







                    <span className="text-gray-400 text-xl">







                      {course.instructor?.name?.charAt(0) || '?'}







                    </span>







                  </div>







                )}







                <div>







                  <h4 className="font-semibold">{course.instructor?.name || 'Unknown Instructor'}</h4>







                  <p className="text-sm text-gray-600">{course.instructor?.bio || 'No bio available'}</p>







                </div>







              </div>







              {course.instructor?.expertise && course.instructor.expertise.length > 0 && (







                <div className="mt-4">







                  <h5 className="font-semibold mb-2">Expertise</h5>







                  <div className="flex flex-wrap gap-2">







                    {course.instructor.expertise.map((skill, index) => (







                      <span







                        key={index}







                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"







                      >







                        {skill}







                      </span>







                    ))}







                  </div>







                </div>







              )}







            </CardContent>







          </Card>















          {/* Course Stats Card */}







          <Card>







            <CardHeader>







              <CardTitle>Course Statistics</CardTitle>







            </CardHeader>







            <CardContent>







              <div className="space-y-3">







                <div className="flex justify-between items-center">







                  <span className="text-gray-600">Total Students</span>







                  <span className="font-medium">







                    {course.enrolledStudents?.length || 0}







                  </span>







                </div>







                <div className="flex justify-between items-center">







                  <span className="text-gray-600">Total Lessons</span>







                  <span className="font-medium">







                    {course.modules?.reduce((acc, module) => 







                      acc + (module.lessons?.length || 0), 0







                    ) || 0}







                  </span>







                </div>







                <div className="flex justify-between items-center">







                  <span className="text-gray-600">Course Level</span>







                  <span className="capitalize font-medium">{course.level || 'N/A'}</span>







                </div>







              </div>







            </CardContent>







          </Card>







        </div>







      </div>







    </div>







  );







};















export default StudentCourseDetail;














