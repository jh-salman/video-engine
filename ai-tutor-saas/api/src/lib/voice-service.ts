import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import * as fs from 'fs';
import * as path from 'path';

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY || '',
});

export interface GenerateVoiceParams {
  text: string;
  outputPath: string;
  voiceId?: string;
}

const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel - a professional, clear voice

export async function generateVoiceAudio(
  params: GenerateVoiceParams
): Promise<string> {
  try {
    const voiceId = params.voiceId || DEFAULT_VOICE_ID;
    
    // Generate audio using ElevenLabs
    const audio = await client.textToSpeech.convert(voiceId, {
      text: params.text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.5,
        use_speaker_boost: true,
      },
    });

    // Ensure output directory exists
    const outputDir = path.dirname(params.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Convert stream to buffer and save
    const chunks: Buffer[] = [];
    for await (const chunk of audio) {
      chunks.push(Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);

    fs.writeFileSync(params.outputPath, buffer);

    return params.outputPath;
  } catch (error) {
    console.error('Error generating voice audio:', error);
    throw new Error(`Failed to generate voice audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

