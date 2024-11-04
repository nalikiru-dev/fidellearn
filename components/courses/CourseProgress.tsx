'use client';

import { Course } from '@/types';
import { Progress } from '@/components/ui/progress';

export default function CourseProgress({ course }: { course: Course }) {
  // You can implement actual progress tracking here
  const progress = 35; // Example progress

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Your Progress</h3>
      <Progress value={progress} className="w-full" />
      <p className="text-sm text-gray-600">{progress}% complete</p>
      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
        Continue Learning
      </button>
    </div>
  );
}
