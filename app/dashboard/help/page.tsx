'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, MessageSquare, Settings, User } from 'lucide-react';

const FAQS = [
  {
    title: "Getting Started",
    icon: BookOpen,
    questions: [
      {
        question: "How do I start learning?",
        answer: "Begin by selecting a course from our catalog. Each course is structured with progressive lessons and interactive exercises to help you learn effectively."
      },
      {
        question: "Can I track my progress?",
        answer: "Yes! Your dashboard shows your progress across all courses, completed lessons, and achievements. You can also view detailed analytics of your learning journey."
      }
    ]
  },
  {
    title: "Chat & Support",
    icon: MessageSquare,
    questions: [
      {
        question: "How can I get help?",
        answer: "You can use our AI chat assistant available 24/7, or reach out to our support team through the contact form. We typically respond within 24 hours."
      },
      {
        question: "Is the chat feature available offline?",
        answer: "The chat requires an internet connection to function. However, you can access previously downloaded course materials offline."
      }
    ]
  },
  {
    title: "Account Settings",
    icon: Settings,
    questions: [
      {
        question: "How do I change my password?",
        answer: "Go to Settings > Security to change your password. Make sure to use a strong password with a mix of letters, numbers, and symbols."
      },
      {
        question: "Can I change my learning language?",
        answer: "Yes! You can change your preferred language in Settings > Learning Preferences. We support multiple languages including English, አማርኛ, Afaan Oromoo, and ትግርኛ."
      }
    ]
  },
  {
    title: "Profile & Privacy",
    icon: User,
    questions: [
      {
        question: "How secure is my data?",
        answer: "We take data security seriously. All your personal information and learning data is encrypted and stored securely. We never share your data with third parties without your consent."
      },
      {
        question: "Can I delete my account?",
        answer: "Yes, you can delete your account and all associated data from Settings > Account > Delete Account. This action is permanent and cannot be undone."
      }
    ]
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = FAQS.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <div className="container max-w-4xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground">
          Find answers to common questions and learn how to use FideLearn effectively.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search FAQs..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6">
        {filteredFAQs.map((category, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {<category.icon className="h-5 w-5" />}
                {category.title}
              </CardTitle>
              <CardDescription>
                Common questions about {category.title.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {category.questions.map((faq, j) => (
                <div key={j} className="space-y-2">
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
