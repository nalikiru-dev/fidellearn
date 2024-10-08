import { NextResponse } from 'next/server'
import { HfInference } from '@huggingface/inference'

const HUGGING_FACE_API_KEY =    process.env.HUGGING_FACE_API_KEY || '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'

export async function POST(req: Request) {
  try {
    const { message, subject } = await req.json()

    if (!HUGGING_FACE_API_KEY) {
      console.error('Hugging Face API key is not set')
      return NextResponse.json({ error: 'Hugging Face API key is not set' }, { status: 500 })
    }

    const hf = new HfInference(HUGGING_FACE_API_KEY)

    const prompt = `<s>[INST] You are FideLearn AI Tutor, an advanced AI assistant for Ethiopian high school students. You specialize in ${subject}. Provide a detailed, accurate, and educational response to the following question or statement:

${message}

Your response should be informative, engaging, and tailored to a high school student's level of understanding. [/INST]`

    const response = await hf.textGeneration({
      model: 'meta-llama/Llama-3.2-3B-Instruct',
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.15,
        do_sample: true,
      },
    })

    console.log('Raw AI response:', response.generated_text)

    let aiResponse = response.generated_text.split('[/INST]')[1]?.trim()

    if (!aiResponse) {
      aiResponse = "I apologize, but I couldn't generate a response. Please try rephrasing your question."
    }

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to generate response'}, { status: 500 })
  }
}