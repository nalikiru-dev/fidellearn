'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import LandingPage from './landing-page'
import StudentDashboard from '@/components/Dashboard/Student/StudentDashboard'
import TeacherDashboard from '@/components/Dashboard/Teacher/TeacherDashboard'
import StaffDashboard from '@/components/Dashboard/Staff/StaffDashboard'
import ManagerDashboard from '@/components/Dashboard/Manager/ManagerDashboard'

export default function Home() {
  const { isSignedIn, isLoaded, user } = useUser()
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (isLoaded) {
      setIsReady(true)
      if (isSignedIn) {
        const role = user?.publicMetadata.role as string
        router.push(`/dashboard/${role}`)
      }
    }
  }, [isSignedIn, isLoaded, router, user])

  if (!isReady || !isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    return <LandingPage />
  }

  const role = user?.publicMetadata.role as string

  switch (role) {
    case 'student':
      return <StudentDashboard />
    case 'teacher':
      return <TeacherDashboard />
    case 'staff':
      return <StaffDashboard />
    case 'manager':
      return <ManagerDashboard />
    default:
      return <LandingPage />
  }
}
