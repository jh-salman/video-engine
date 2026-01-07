import Anthropic from '@anthropic-ai/sdk';
import type { AIScript, CodeAction } from '@ai-tutor-saas/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export interface GenerateScriptParams {
  title: string;
  topic: string;
}

export async function generateAIScript(
  params: GenerateScriptParams
): Promise<AIScript> {
  const prompt = `You are an expert coding tutor. Generate a detailed tutorial script for "${params.title}" covering the topic: "${params.topic}".

The script should be structured as JSON with:
1. "narration": A detailed explanation text that will be converted to speech
2. "codeActions": An array of code editing actions, each with:
   - "file": The file path (e.g., "src/components/Button.tsx")
   - "action": One of "create", "update", or "delete"
   - "content": The full file content or changes
   - "duration": Duration in seconds for this action (estimate based on complexity, typically 3-10 seconds)

The narration should explain what we're building and why. Each codeAction should be synchronized with the narration.
The total duration should be reasonable for a tutorial (5-15 minutes total).

Return ONLY valid JSON, no markdown formatting, no code blocks.`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    // Parse the JSON response
    const jsonText = content.text.trim();
    // Remove markdown code blocks if present
    const cleanedJson = jsonText.replace(/^```json\n?/g, '').replace(/```$/g, '').trim();
    
    const script: AIScript = JSON.parse(cleanedJson);

    // Validate the structure
    if (!script.narration || !Array.isArray(script.codeActions)) {
      throw new Error('Invalid script structure');
    }

    // Validate each code action
    for (const action of script.codeActions) {
      if (!action.file || !action.action || !action.content || typeof action.duration !== 'number') {
        throw new Error('Invalid code action structure');
      }
      if (!['create', 'update', 'delete'].includes(action.action)) {
        throw new Error(`Invalid action type: ${action.action}`);
      }
    }

    return script;
  } catch (error) {
    console.error('Error generating AI script:', error);
    throw new Error(`Failed to generate AI script: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

