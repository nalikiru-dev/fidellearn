'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Book,
  Brain,
  Users,
  Star,
  Target,
  Zap,
  MessageSquare,
  BarChart2,
  Lightbulb,
  Award,
  Compass,
  Video,
  FileText,
  HelpCircle,
  Rocket
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function HelpPage() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Learning",
      description: "Personalized learning paths and recommendations powered by advanced AI algorithms"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Beast Mode",
      description: "Enhanced focus and learning features for maximum productivity"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Interactive Community",
      description: "Connect with fellow learners and educators in a vibrant learning community"
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Live Sessions",
      description: "Real-time interactive classes and workshops with expert instructors"
    }
  ];

  const faqs = [
    {
      question: "What is Fidelearn?",
      answer: "Fidelearn is an innovative e-learning platform that combines AI-powered personalization, interactive learning, and community engagement to create an effective and engaging educational experience."
    },
    {
      question: "What is Beast Mode?",
      answer: "Beast Mode is our unique feature that enhances your learning experience by activating advanced AI tutoring, focus timers, and detailed progress analytics to maximize your learning potential."
    },
    {
      question: "How does the AI tutoring work?",
      answer: "Our AI tutoring system analyzes your learning style, progress, and goals to provide personalized recommendations, adaptive content, and real-time assistance tailored to your needs."
    },
    {
      question: "Can I interact with other students?",
      answer: "Yes! Fidelearn offers various community features including discussion forums, study groups, peer reviews, and collaborative projects to enhance your learning through interaction with fellow students."
    }
  ];

  return (
    <div className="container mx-auto py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tight">Welcome to Fidelearn</h1>
        <p className="text-xl text-muted-foreground">
          Your AI-Powered Learning Companion
        </p>
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-primary" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Follow these steps to begin your learning journey:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Complete your profile setup</li>
                  <li>Choose your learning interests</li>
                  <li>Explore available courses</li>
                  <li>Join the community</li>
                </ol>
                <Button className="w-full">Start Learning</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-primary" />
                  Learning Paths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Discover structured learning paths:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Book className="w-4 h-4" /> Beginner Tracks
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4" /> Specialized Courses
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4" /> Professional Certificates
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Explore Paths
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Activate Beast Mode for focused learning
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> Join study groups
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" /> Track your progress
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features">
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {feature.icon}
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Need More Help?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Our support team is always here to help you succeed in your learning journey.</p>
          <div className="flex gap-4">
            <Button>Contact Support</Button>
            <Button variant="outline">View Documentation</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
