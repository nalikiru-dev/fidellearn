'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AccountPage() {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  // Type assertion for publicMetadata
  const publicMetadata = user.publicMetadata as { role?: string };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src={user.imageUrl} alt={user.fullName || ''} />
              <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{user.fullName}</h2>
            <p className="text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
          <div className="space-y-4">
            <div>
              <strong>Username:</strong> {user.username || 'Not set'}
            </div>
            <div>
              <strong>Email:</strong> {user.primaryEmailAddress?.emailAddress || 'Not set'}
            </div>
            <div>
              <strong>Role:</strong> {publicMetadata.role || 'Not set'}
            </div>
          </div>
          <div className="mt-6">
            <Link href="/profile">
              <Button>Edit Profile</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
