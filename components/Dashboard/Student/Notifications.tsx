'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertCircle, Info, Bell, Trash2 } from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { useToast } from '@/components/ui/use-toast';

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'course' | 'achievement' | 'system' | 'community';
  read: boolean;
  createdAt: string;
  link?: string;
}

const NotificationsPage: React.FC<{ userId: string }> = ({ userId }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const result = await client.fetch(`
        *[_type == "notification" && user == $userId] | order(createdAt desc) {
          _id,
          title,
          message,
          type,
          read,
          createdAt,
          link
        }
      `, { userId });
      setNotifications(result);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast({
        title: "Error",
        description: "Failed to load notifications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await client
        .patch(notificationId)
        .set({ read: true })
        .commit();

      setNotifications(notifications.map(notification =>
        notification._id === notificationId
          ? { ...notification, read: true }
          : notification
      ));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark notification as read",
        variant: "destructive",
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      await Promise.all(
        unreadNotifications.map(notification =>
          client
            .patch(notification._id)
            .set({ read: true })
            .commit()
        )
      );

      setNotifications(notifications.map(notification => ({
        ...notification,
        read: true
      })));

      toast({
        description: "All notifications marked as read",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark all notifications as read",
        variant: "destructive",
      });
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      await client.delete(notificationId);
      setNotifications(notifications.filter(n => n._id !== notificationId));
      toast({
        description: "Notification deleted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete notification",
        variant: "destructive",
      });
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'achievement':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'system':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'community':
        return <Info className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Notifications</h2>
        <Button variant="outline" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification._id}
                className={`transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {getNotificationIcon(notification.type)}
                      <div>
                        <h3 className="font-semibold">{notification.title}</h3>
                        <p className="text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-sm text-gray-400 mt-2">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification._id)}
                        >
                          Mark as read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification._id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="mt-6">
          <div className="space-y-4">
            {notifications.filter(n => !n.read).map((notification) => (
              // Same notification card component as above
              <Card key={notification._id} className="bg-blue-50">
                {/* ... notification content ... */}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="read" className="mt-6">
          <div className="space-y-4">
            {notifications.filter(n => n.read).map((notification) => (
              // Same notification card component as above
              <Card key={notification._id}>
                {/* ... notification content ... */}
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPage; 
