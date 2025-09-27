import { NextRequest } from "next/server";
import { streamText } from 'ai';
import 'dotenv/config';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: 'openai/gpt-4.1',
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}