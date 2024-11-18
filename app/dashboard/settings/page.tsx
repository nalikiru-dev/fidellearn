'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import {
  Bell,
  Moon,
  Sun,
  Globe,
  Lock,
  BookOpen,
  Settings,
  User,
  Laptop,
  BellRing,
  Palette,
  Languages,
  Eye,
  MessageSquare,
  Zap,
  Brain,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { Slider } from '../../../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';

const LANGUAGES = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'am', label: 'አማርኛ', flag: '🇪🇹' },
  { value: 'or', label: 'Afaan Oromoo', flag: '🇪🇹' },
  { value: 'ti', label: 'ትግርኛ', flag: '🇪🇹' },
];

export default function SettingsPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [beastMode, setBeastMode] = useState(false);
  const [focusLevel, setFocusLevel] = useState(50);

  const updateSettings = async (category: string, setting: string, value: any) => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast({
        title: "Settings updated",
        description: "Your preferences have been saved successfully.",
        variant: "default",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update settings. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container max-w-6xl p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and learning settings
          </p>
        </div>
        {isSaving && (
          <Badge variant="outline" className="animate-pulse">
            Saving changes...
          </Badge>
        )}
      </div>

      <div className="grid gap-8">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Manage your FideLearn profile information
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || ''} />
              <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <p className="text-lg font-medium">{user?.fullName}</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="text-muted-foreground">{user?.emailAddresses[0].emailAddress}</p>
              </div>
              <Button variant="outline">Update Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Learning Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Learning Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Language</Label>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred learning language
                </p>
              </div>
              <Select defaultValue="en" onValueChange={(value) => updateSettings('learning', 'language', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>AI Learning Assistant</Label>
                <p className="text-sm text-muted-foreground">
                  Enable AI-powered learning recommendations
                </p>
              </div>
              <Switch defaultChecked onCheckedChange={(checked) => updateSettings('learning', 'aiAssistant', checked)} />
            </div>
          </CardContent>
        </Card>

        {/* Beast Mode */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Beast Mode Settings</CardTitle>
            <CardDescription>
              Enhance your learning experience with advanced features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="beast-mode" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Beast Mode
                </Label>
                <p className="text-sm text-muted-foreground">
                  Activate enhanced learning features and AI-powered assistance
                </p>
              </div>
              <Switch
                id="beast-mode"
                checked={beastMode}
                onCheckedChange={(checked) => {
                  setBeastMode(checked);
                  updateSettings('preferences', 'beastMode', checked);
                }}
              />
            </div>

            {beastMode && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Focus Level
                  </Label>
                  <Slider
                    value={[focusLevel]}
                    onValueChange={(value) => {
                      setFocusLevel(value[0]);
                      updateSettings('preferences', 'focusLevel', value[0]);
                    }}
                    max={100}
                    step={1}
                  />
                  <p className="text-sm text-muted-foreground">
                    Current Focus Level: {focusLevel}%
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Beast Mode Features</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">AI Tutor</Badge>
                      <span className="text-sm text-muted-foreground">
                        Enhanced AI assistance for deeper learning
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Focus Timer</Badge>
                      <span className="text-sm text-muted-foreground">
                        Optimized study intervals
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Advanced Analytics</Badge>
                      <span className="text-sm text-muted-foreground">
                        Detailed learning progress insights
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BellRing className="w-5 h-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Exam Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about upcoming exams and deadlines
                </p>
              </div>
              <Switch defaultChecked onCheckedChange={(checked) => updateSettings('notifications', 'examReminders', checked)} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Progress Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Weekly progress and achievement notifications
                </p>
              </div>
              <Switch defaultChecked onCheckedChange={(checked) => updateSettings('notifications', 'progressUpdates', checked)} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}