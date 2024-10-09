'use client'

import { useUser } from '@clerk/nextjs'
import { Chat } from '@/components/app-chat-page'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import LandingPage from './landing-page'

export default function Home() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (isLoaded) {
      setIsReady(true)
      if (!isSignedIn) {
        router.push('/')
      }
    }
  }, [isSignedIn, isLoaded, router])

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

  return (
    <main>
      <Chat />
    </main>
  )
}
