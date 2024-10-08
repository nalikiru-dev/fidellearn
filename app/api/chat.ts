'use client'

import { NextResponse } from 'next/server'
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

export async function POST(req: Request) {
  const { message, subject } = await req.json()

  if (!process.env.HUGGINGFACE_API_KEY) {
    return NextResponse.json({ error: 'Hugging Face API key is not set' }, { status: 500 })
  }

  try {
    const response = await hf.textGeneration({
      model: 'distilgpt2',
      inputs: `FideLearn AI Tutor for Ethiopian high school students.
Subject: ${subject}
Human: ${message}
AI:`,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.2,
      },
    })

    const aiResponse = response.generated_text.split('AI:')[1].trim()
    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}