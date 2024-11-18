'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const updateSettings = async (category: string, setting: string, value: any) => {
  try {
    const response = await fetch(`/api/settings/${category}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        [setting]: value,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update settings');
    }

    toast.success('Settings updated successfully');
  } catch (error) {
    console.error('Error updating settings:', error);
    toast.error('Failed to update settings');
  }
};

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const { theme, setTheme } = useTheme();

  return (
    <div className="container max-w-4xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how FideLearn looks on your device.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="theme" className="flex items-center gap-2">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                Theme
              </Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Choose what notifications you want to receive.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Push Notifications
              </Label>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={(checked) => {
                  setNotifications(checked);
                  updateSettings('notifications', 'push', checked);
                }}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-updates">Email Updates</Label>
              <Switch
                id="email-updates"
                checked={emailUpdates}
                onCheckedChange={(checked) => {
                  setEmailUpdates(checked);
                  updateSettings('notifications', 'email', checked);
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Deletion */}
        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
            <CardDescription>
              Permanently delete your account and all associated data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}