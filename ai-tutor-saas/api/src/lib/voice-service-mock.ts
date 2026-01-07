import * as fs from 'fs';
import * as path from 'path';

export interface GenerateVoiceParams {
  text: string;
  outputPath: string;
  voiceId?: string;
}

// Generate a dummy MP3 file (silent audio) for testing
export async function generateVoiceAudioMock(
  params: GenerateVoiceParams
): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Ensure output directory exists
  const outputDir = path.dirname(params.outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create a minimal valid MP3 file header (silent audio)
  // This is a very basic MP3 header - in production you'd use a proper audio library
  const mp3Header = Buffer.from([
    0xFF, 0xFB, 0x90, 0x00, // MP3 sync word + header
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  ]);

  // Create a dummy audio file (1 second of silence at 44.1kHz)
  // For a real implementation, you'd generate actual audio
  // For now, we'll create a minimal valid file
  const silentAudio = Buffer.alloc(1000); // 1KB dummy file
  mp3Header.copy(silentAudio, 0);

  fs.writeFileSync(params.outputPath, silentAudio);

  console.log(`[MOCK] Generated dummy audio file: ${params.outputPath}`);
  return params.outputPath;
}

