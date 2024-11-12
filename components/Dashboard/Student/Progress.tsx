'use client';



import React, { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Progress } from '@/components/ui/progress';

import { BarChart, Trophy, Clock, Target } from 'lucide-react';

import { client } from '@/lib/sanity/client';



interface ProgressProps {

  userId: string;

}



interface CourseProgress {

  course: {

    _id: string;

    title: string;

    coverImage: any;

  };

  completionPercentage: number;

  lastAccessed: string;

  completedLessons: number;

  totalLessons: number;

  quizScores: {

    quizId: string;

    score: number;

    maxScore: number;

    completedAt: string;

  }[];

}



const ProgressComponent: React.FC<ProgressProps> = ({ userId }) => {

  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);

  const [loading, setLoading] = useState(true);

  const [overallStats, setOverallStats] = useState({

    totalCourses: 0,

    averageCompletion: 0,

    totalHoursLearned: 0,

    achievementsEarned: 0

  });



  useEffect(() => {

    const fetchProgress = async () => {

      try {

        const result = await client.fetch(`

          *[_type == "progress" && user == $userId] {

            course->{

              _id,

              title,

              coverImage

            },

            completionPercentage,

            lastAccessed,

            completedLessons,

            "totalLessons": count(course->modules[].lessons[]),

            quizScores

          }

        `, { userId });



        setCourseProgress(result);



        // Calculate overall stats

        const stats = {

          totalCourses: result.length,

          averageCompletion: result.reduce((acc: number, curr: { completionPercentage: number }) => acc + curr.completionPercentage, 0) / result.length,

          totalHoursLearned: result.reduce((acc: number, curr: { completedLessons: number }) => acc + (curr.completedLessons * 0.5), 0), // Assuming 30 mins per lesson

          achievementsEarned: Math.floor(result.reduce((acc: number, curr: { completionPercentage: number }) => acc + curr.completionPercentage, 0) / 25) // 1 achievement per 25% completion

        };



        setOverallStats(stats);

      } catch (error) {

        console.error('Error fetching progress:', error);

      } finally {

        setLoading(false);

      }

    };



    fetchProgress();

  }, [userId]);



  if (loading) {

    return <div>Loading...</div>;

  }



  return (

    <div className="space-y-8">

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <Card>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>

            <BarChart className="h-4 w-4 text-muted-foreground" />

          </CardHeader>

          <CardContent>

            <div className="text-2xl font-bold">{overallStats.totalCourses}</div>

            <p className="text-xs text-muted-foreground">

              Enrolled courses

            </p>

          </CardContent>

        </Card>

        <Card>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

            <CardTitle className="text-sm font-medium">Average Completion</CardTitle>

            <Target className="h-4 w-4 text-muted-foreground" />

          </CardHeader>

          <CardContent>

            <div className="text-2xl font-bold">

              {Math.round(overallStats.averageCompletion)}%

            </div>

            <Progress value={overallStats.averageCompletion} className="mt-2" />

          </CardContent>

        </Card>

        <Card>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

            <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>

            <Clock className="h-4 w-4 text-muted-foreground" />

          </CardHeader>

          <CardContent>

            <div className="text-2xl font-bold">{overallStats.totalHoursLearned}</div>

            <p className="text-xs text-muted-foreground">

              Total learning hours

            </p>

          </CardContent>

        </Card>

        <Card>

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

            <CardTitle className="text-sm font-medium">Achievements</CardTitle>

            <Trophy className="h-4 w-4 text-muted-foreground" />

          </CardHeader>

          <CardContent>

            <div className="text-2xl font-bold">{overallStats.achievementsEarned}</div>

            <p className="text-xs text-muted-foreground">

              Earned achievements

            </p>

          </CardContent>

        </Card>

      </div>



      <div className="grid gap-6">

        <h2 className="text-2xl font-bold">Course Progress</h2>

        {courseProgress.map((progress) => (

          <Card key={progress.course._id}>

            <CardHeader>

              <CardTitle>{progress.course.title}</CardTitle>

            </CardHeader>

            <CardContent>

              <div className="space-y-4">

                <Progress value={progress.completionPercentage} />

                <div className="flex justify-between text-sm text-gray-500">

                  <span>{progress.completionPercentage}% complete</span>

                  <span>{progress.completedLessons} of {progress.totalLessons} lessons completed</span>

                </div>

                {progress.quizScores && progress.quizScores.length > 0 && (

                  <div className="mt-4">

                    <h4 className="font-semibold mb-2">Quiz Scores</h4>

                    <div className="space-y-2">

                      {progress.quizScores.map((quiz, index) => (

                        <div key={index} className="flex justify-between items-center">

                          <span>Quiz {index + 1}</span>

                          <span className="font-medium">

                            {quiz.score}/{quiz.maxScore} ({Math.round((quiz.score / quiz.maxScore) * 100)}%)

                          </span>

                        </div>

                      ))}

                    </div>

                  </div>

                )}

              </div>

            </CardContent>

          </Card>

        ))}

      </div>

    </div>

  );

};



export default ProgressComponent; 














