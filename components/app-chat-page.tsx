'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StructuredResponse } from './structured-resp'
import { useUser } from '@clerk/nextjs'
import { MessageSquare, Send, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

type Message = {
  role: 'user' | 'assistant'
  content: string
  timestamp?: Date
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

const AppChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "Hello! I'm your FideLearn AI tutor. Which subject would you like to study today?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [subject, setSubject] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { user } = useUser()

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || !subject) return
  
    const userMessage: Message = { 
      role: 'user', 
      content: input,
      timestamp: new Date()
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          subject,
          history: messages.slice(-10).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: data.message || data.response || "I'm sorry, I couldn't process that request.",
        timestamp: new Date()
      }])
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to get response. Please try again.')
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I encountered an error. Please try asking your question again.",
        timestamp: new Date()
      }])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] bg-background p-4 md:p-6">
      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 rounded-lg border shadow-sm">
        {/* Chat Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b px-4 py-3 sm:px-6 sm:py-4 gap-3 bg-background">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-primary" />
            <div>
              <h2 className="font-semibold">AI Tutor</h2>
              <p className="text-sm text-muted-foreground">
                {subject ? `Learning ${subject}` : 'Select a subject to begin'}
              </p>
            </div>
          </div>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 rounded-lg p-4 transition-colors ${
                  message.role === 'assistant' ? 'bg-muted/50' : 'bg-primary/5'
                }`}
              >
                <div className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center ${
                  message.role === 'assistant' ? 'bg-primary text-primary-foreground' : 'bg-primary/10'
                }`}>
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium">
                      {message.role === 'assistant' ? 'AI Tutor' : user?.fullName || 'You'}
                    </span>
                    {message.timestamp && (
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                  <div className="prose prose-sm max-w-none break-words whitespace-pre-wrap">
                    <StructuredResponse content={message.content} />
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">AI is thinking...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t p-4 md:p-6 bg-background">
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-5xl mx-auto">
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={subject ? `Ask anything about ${subject}...` : "Select a subject first"}
                disabled={!subject || isLoading}
                className="pr-24"
              />
              <Button 
                type="submit"
                size="sm"
                disabled={!subject || isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AppChatPage
