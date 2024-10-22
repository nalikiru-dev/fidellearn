'use client'



import { useUser } from '@clerk/nextjs'

import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

import StudentDashboard from '@/components/Dashboard/Student/StudentDashboard'

import TeacherDashboard from '@/components/Dashboard/Teacher/TeacherDashboard'

import StaffDashboard from '@/components/Dashboard/Staff/StaffDashboard'

import ManagerDashboard from '@/components/Dashboard/Manager/ManagerDashboard'



export default function DashboardPage() {

  const { isSignedIn, isLoaded, user } = useUser()

  const router = useRouter()



  useEffect(() => {

    if (isLoaded && !isSignedIn) {

      router.push('/')

    }

  }, [isSignedIn, isLoaded, router])



  try {
    if (!isLoaded || !isSignedIn) {

      return null

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

        return <div>Invalid role</div>

    }

  } catch (error) {
    console.error('Error initializing Sanity client:', error)
    return <div>Error loading dashboard. Please try again later.</div>
  }

}


