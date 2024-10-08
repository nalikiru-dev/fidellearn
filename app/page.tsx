'use client'

import { useUser } from '@clerk/nextjs'
import { Chat } from '@/components/app-chat-page'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isSignedIn, isLoaded, router])

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <img src="https://i.gifer.com/ZKZg.gif" alt="Loading..." className="w-16 h-16" />
      </div>
    )
  }

  if (!isSignedIn) {
    return null // This will be briefly shown before the redirect
  }

  return (
    <main>
      <Chat />
    </main>
  )
}
