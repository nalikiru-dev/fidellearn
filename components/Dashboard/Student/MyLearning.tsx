'use client';

import React, { useEffect, useState } from 'react';
import { client } from '@/lib/sanity/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock } from 'lucide-react';

interface MyLearningProps {
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
}

const MyLearning: React.FC<MyLearningProps> = ({ userId }) => {
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);

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
            lastAccessed
          }
        `, { userId });
        setCourseProgress(result);
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
      <h2 className="text-3xl font-bold">My Learning</h2>
      <div className="grid gap-6">
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
                  <span>Last accessed: {new Date(progress.lastAccessed).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyLearning; 






