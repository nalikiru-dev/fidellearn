"use client"

import React from 'react'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

export interface ToastProps {
  title: string
  description?: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({ title, description, type = 'info', onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
  const Icon = type === 'success' ? CheckCircle : type === 'error' ? XCircle : Info

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white p-4 rounded-md shadow-lg max-w-sm`}>
      <div className="flex items-center">
        <Icon className="mr-2" size={20} />
        <div>
          <h3 className="font-bold">{title}</h3>
          {description && <p className="text-sm">{description}</p>}
        </div>
        <button onClick={onClose} className="ml-auto">
          <X size={20} />
        </button>
      </div>
    </div>
  )
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export const ToastViewport: React.FC = () => {
  return <div id="toast-viewport" />
}