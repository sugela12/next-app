import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
  const { messages } = await req.json();
  
  // 简单的模拟响应，避免认证问题
  const lastMessage = messages[messages.length - 1];
  const userInput = lastMessage?.content || '';
  
  // 模拟AI响应
  const responses = {
    'hello': 'Hello! How can I help you today?',
    '你好': '你好！我可以为你做什么吗？',
    'what is the capital of france': 'The capital of France is Paris.',
    '法国的首都是什么': '法国的首都是巴黎。',
    'default': `I received your message: "${userInput}". This is a demo response. To use real AI, please configure your API key in the .env.local file.`
  };
  
  const response = Object.keys(responses).find(key => 
    userInput.toLowerCase().includes(key.toLowerCase())
  ) || 'default';
  
  const aiResponse = responses[response as keyof typeof responses];
  
  // 创建流式响应
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      
      // 模拟打字效果
      let i = 0;
      const interval = setInterval(() => {
        if (i < aiResponse.length) {
          controller.enqueue(encoder.encode(aiResponse[i]));
          i++;
        } else {
          controller.close();
          clearInterval(interval);
        }
      }, 50);
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}