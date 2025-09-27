import { NextRequest } from "next/server";
import { streamText } from 'ai';
import 'dotenv/config';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      throw new Error("Invalid messages format");
    }
    const result = await streamText({
      model: 'openai/gpt-4.1', // Update with the correct model if needed
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Error processing the request:", error.message); 
    return new Response("Please don't ask questions too frequently. Try again later.", {
      status: 500, 
    });
  }
}
