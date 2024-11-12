'use client';



import { useUser, useClerk } from '@clerk/nextjs';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useToast } from '@/hooks/use-toast';

import { Toast } from '@/components/ui/profile-toast';



export default function ProfilePage() {

  const { user } = useUser();

  const { signOut } = useClerk();

  const router = useRouter();

  const [firstName, setFirstName] = useState(user?.firstName || '');

  const [lastName, setLastName] = useState(user?.lastName || '');

  const [loading, setLoading] = useState(false);

  const { toast, showToast, dismissToast } = useToast();



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);

    try {

      await user?.update({

        firstName,

        lastName,

      });

      showToast({

        title: "Profile updated successfully!",

        description: "Your changes have been saved.",

        type: "success",

      });

    } catch (error) {

      console.error('Error updating profile:', error);

      showToast({

        title: "Failed to update profile",

        description: "An unexpected error occurred. Please try again.",

        type: "error",

      });

    } finally {

      setLoading(false);

    }

  };



  const handleLogout = async () => {

    try {

      await signOut();

      router.push('/');

    } catch (error) {

      console.error('Error signing out:', error);

      showToast({

        title: "Failed to sign out",

        description: "An unexpected error occurred. Please try again.",

        type: "error",

      });

    }

  };



  return (

    <div className="container mx-auto p-6">

      <Card className="max-w-2xl mx-auto">

        <CardHeader>

          <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>

        </CardHeader>

        <CardContent>

          <div className="flex flex-col items-center mb-6">

            <Avatar className="w-32 h-32 mb-4">

              <AvatarImage src={user?.imageUrl} alt={user?.fullName || ''} />

              <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>

            </Avatar>

            <h2 className="text-xl font-semibold">{user?.fullName}</h2>

            <p className="text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>

              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>

              <Input

                id="firstName"

                type="text"

                value={firstName}

                onChange={(e) => setFirstName(e.target.value)}

                className="mt-1"

              />

            </div>

            <div>

              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>

              <Input

                id="lastName"

                type="text"

                value={lastName}

                onChange={(e) => setLastName(e.target.value)}

                className="mt-1"

              />

            </div>

            <div className="flex justify-between">

              <Button type="submit" disabled={loading}>

                {loading ? 'Updating...' : 'Update Profile'}

              </Button>

              <Button type="button" variant="destructive" onClick={handleLogout}>

                Logout

              </Button>

            </div>

          </form>

        </CardContent>

      </Card>

      {toast && (

        <Toast

          title={toast.title}

          description={toast.description}

          type={toast.type}

          onClose={dismissToast}

        />

      )}

    </div>

  );

}