'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StructuredResponse } from './structured-resp'
import { useUser, UserButton, useClerk } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Geography',
  'English',
  'Amharic',
]

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your FideLearn AI tutor, designed to help Ethiopian high school students. Which subject would you like to study today?" }
  ])
  const [input, setInput] = useState('')
  const [subject, setSubject] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
  
    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
  
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, subject }),
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get response')
      }
  
      const data = await response.json()
      const aiResponse = data.response
  
      const assistantMessage: Message = { role: 'assistant', content: aiResponse }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      setMessages((prev) => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again." }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/sign-in')
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <header className="bg-white text-gray-800 py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">FideLearn AI Tutor</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.firstName || 'User'}!</span>
            <Link href="/profile">
              <Button variant="outline">Profile</Button>
            </Link>
            <UserButton afterSignOutUrl="/sign-in" />
            <Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col max-w-5xl">
        <div className="mb-4">
          <Select onValueChange={setSubject} value={subject}>
            <SelectTrigger className="w-full md:w-64 bg-white">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((sub) => (
                <SelectItem key={sub} value={sub}>
                  {sub}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-grow flex flex-col"> 
          <ScrollArea className="flex-grow mb-4 border rounded-lg bg-white shadow-inner h-[calc(100vh-300px)]">
            <div className="p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    } max-w-[80%]`}
                  >
                    {message.role === 'user' ? (
                      <p>{message.content}</p>
                    ) : (
                      <StructuredResponse content={message.content} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your selected subject..."
              className="flex-grow bg-white"
              disabled={isLoading || !subject}
            />
            <Button type="submit" disabled={isLoading || !subject} className="bg-purple-600 hover:bg-purple-700 text-white">
              {isLoading ? 'Thinking...' : 'Send'}
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}