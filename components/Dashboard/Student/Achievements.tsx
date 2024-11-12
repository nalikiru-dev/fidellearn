'use client';


import React from 'react';

import { motion } from 'framer-motion';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Progress } from '@/components/ui/progress';

import {

  Trophy,

  Star,

  Target,

  Zap,

  BookOpen,

  Users,

  Award,

  TrendingUp

} from 'lucide-react';



interface Achievement {

  id: string;

  title: string;

  description: string;

  icon: JSX.Element;

  progress: number;

  maxProgress: number;

  unlocked: boolean;

  category: string;

  points: number;

  color: string;

}



const achievements: Achievement[] = [

  {

    id: '1',

    title: 'Fast Learner',

    description: 'Complete your first course within 30 days',

    icon: <Zap className="h-6 w-6" />,

    progress: 25,

    maxProgress: 30,

    unlocked: false,

    category: 'Learning',

    points: 100,

    color: 'bg-blue-500'

  },

  {

    id: '2',

    title: 'Knowledge Seeker',

    description: 'Enroll in courses from 5 different subjects',

    icon: <BookOpen className="h-6 w-6" />,

    progress: 3,

    maxProgress: 5,

    unlocked: false,

    category: 'Diversity',

    points: 150,

    color: 'bg-purple-500'

  },

  {

    id: '3',

    title: 'Community Leader',

    description: 'Help 10 other students in the community forum',

    icon: <Users className="h-6 w-6" />,

    progress: 10,

    maxProgress: 10,

    unlocked: true,

    category: 'Community',

    points: 200,

    color: 'bg-green-500'

  },

  {

    id: '4',

    title: 'Perfect Score',

    description: 'Achieve 100% in any course assessment',

    icon: <Target className="h-6 w-6" />,

    progress: 95,

    maxProgress: 100,

    unlocked: false,

    category: 'Excellence',

    points: 250,

    color: 'bg-yellow-500'

  },

  {

    id: '5',

    title: 'Consistent Learner',

    description: 'Study for 30 consecutive days',

    icon: <TrendingUp className="h-6 w-6" />,

    progress: 28,

    maxProgress: 30,

    unlocked: false,

    category: 'Consistency',

    points: 300,

    color: 'bg-red-500'

  },

  {

    id: '6',

    title: 'Early Adopter',

    description: 'One of the first 1000 students on FideLearn',

    icon: <Star className="h-6 w-6" />,

    progress: 1,

    maxProgress: 1,

    unlocked: true,

    category: 'Special',

    points: 500,

    color: 'bg-indigo-500'

  }

];



const AchievementsPage = () => {

  const totalPoints = achievements.reduce((acc, achievement) => 

    acc + (achievement.unlocked ? achievement.points : 0), 0

  );



  const unlockedAchievements = achievements.filter(a => a.unlocked).length;



  return (

    <div className="space-y-8">

      {/* Stats Overview */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Trophy className="h-5 w-5" />

              Total Points

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="text-3xl font-bold">{totalPoints}</div>

            <p className="text-purple-100">Keep learning to earn more!</p>

          </CardContent>

        </Card>



        <Card>

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Award className="h-5 w-5" />

              Achievements Unlocked

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="text-3xl font-bold">{unlockedAchievements}/{achievements.length}</div>

            <Progress value={(unlockedAchievements / achievements.length) * 100} className="mt-2" />

          </CardContent>

        </Card>



        <Card>

          <CardHeader>

            <CardTitle className="flex items-center gap-2">

              <Star className="h-5 w-5" />

              Current Rank

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="text-3xl font-bold">Silver</div>

            <p className="text-gray-500">Next rank: Gold (2000 points needed)</p>

          </CardContent>

        </Card>

      </div>



      {/* Achievements Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {achievements.map((achievement) => (

          <motion.div

            key={achievement.id}

            whileHover={{ y: -5 }}

            transition={{ duration: 0.2 }}

          >

            <Card className={`relative overflow-hidden ${achievement.unlocked ? 'border-green-500' : ''}`}>

              <div className={`absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8 rotate-45 ${achievement.color} opacity-10`} />

              <CardHeader>

                <CardTitle className="flex items-center gap-2">

                  <div className={`p-2 rounded-lg ${achievement.color} bg-opacity-10`}>

                    {achievement.icon}

                  </div>

                  {achievement.title}

                </CardTitle>

              </CardHeader>

              <CardContent>

                <p className="text-gray-600 mb-4">{achievement.description}</p>

                <div className="space-y-2">

                  <Progress 

                    value={(achievement.progress / achievement.maxProgress) * 100} 

                    className="h-2"

                  />

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">

                      {achievement.progress}/{achievement.maxProgress}

                    </span>

                    <span className="text-blue-600 font-medium">

                      {achievement.points} points

                    </span>

                  </div>

                </div>

              </CardContent>

            </Card>

          </motion.div>

        ))}

      </div>

    </div>

  );

};



export default AchievementsPage; 














