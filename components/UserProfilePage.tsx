'use client'

import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function UserProfilePage() {
  const { user } = useUser()

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:max-w-5xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
          <img
              src={user.imageUrl}
              alt={user.fullName || 'User'}
              width={500}
              height={300}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">User Profile</div>
            <h2 className="mt-2 text-xl md:text-2xl leading-7 font-semibold text-gray-900">
              {user.fullName}
            </h2>
            <p className="mt-2 text-gray-600 text-sm md:text-base">{user.primaryEmailAddress?.emailAddress}</p>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">Account Details</h3>
              <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                <div className="py-3 flex justify-between text-sm font-medium">
                  <dt className="text-gray-500">User ID</dt>
                  <dd className="text-gray-900">{user.id}</dd>
                </div>
                <div className="py-3 flex justify-between text-sm font-medium">
                  <dt className="text-gray-500">Created At</dt>
                  <dd className="text-gray-900">
                    {user.createdAt 
                      ? new Date(user.createdAt).toLocaleDateString()
                      : 'Not available'}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="mt-6">
              <Link href="/">
                <Button variant="default" className="w-full">Back to Chat</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}