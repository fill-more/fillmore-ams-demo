import { openai } from '@ai-sdk/openai';
import { streamText, tool, stepCountIs } from 'ai';
import { z } from 'zod';
import { getAllTrainees } from './tools/traineeTools';
import { GPT_CONFIG } from '../src/lib/constants/models';

export const config = {
  runtime: 'edge',
};

interface RequestBody {
  message: string;
  instruction?: string;
  model?: string;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = (await req.json()) as RequestBody;
    const { message, instruction, model } = body;

    if (!message || !message.trim()) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = streamText({
      model: openai(model || GPT_CONFIG.DEFAULT_MODEL),
      system: instruction,
      prompt: message,
      stopWhen: stepCountIs(5),
      tools: {
        get_all_trainees: tool({
          description:
            'Get all trainee information from the database. ONLY use this when the user asks about trainees, learners, students, their progress, performance, or who is falling behind.',
          inputSchema: z.object({}),
          execute: async () => {
            return await getAllTrainees();
          },
        }),
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Edge Function Error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
