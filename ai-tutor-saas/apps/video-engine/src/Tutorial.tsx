import React, { useMemo } from 'react';
import { useVideoConfig, Audio, staticFile } from 'remotion';
import { VirtualIDE } from './components/VirtualIDE';
import { BrowserPreview } from './components/BrowserPreview';
import { Terminal } from './components/Terminal';
import type { AIScript } from '@ai-tutor-saas/types';

interface TutorialProps {
  tutorialId: string;
  audioUrl: string;
  aiScript: AIScript;
}

export const Tutorial: React.FC<TutorialProps> = ({ audioUrl, aiScript }) => {
  const { fps } = useVideoConfig();

  // Calculate total duration from code actions
  const totalDuration = useMemo(() => {
    return aiScript.codeActions.reduce((sum, action) => sum + action.duration, 0);
  }, [aiScript.codeActions]);

  // Calculate audio duration in frames (we'll use the total duration or estimate)
  const audioDurationFrames = Math.floor(totalDuration * fps);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0a0a0a',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Audio track - synchronized with video */}
      {audioUrl && (
        <Audio
          src={audioUrl.startsWith('http') ? audioUrl : staticFile(audioUrl.replace('/uploads/', ''))}
          startFrom={0}
          endAt={audioDurationFrames}
        />
      )}

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '2fr 1fr',
          gap: '16px',
          padding: '16px',
        }}
      >
        {/* Top Left: Virtual IDE */}
        <div
          style={{
            gridColumn: '1',
            gridRow: '1',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          <VirtualIDE
            codeActions={aiScript.codeActions}
            audioDuration={totalDuration}
          />
        </div>

        {/* Top Right: Browser Preview */}
        <div
          style={{
            gridColumn: '2',
            gridRow: '1',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          <BrowserPreview />
        </div>

        {/* Bottom: Terminal (spans both columns) */}
        <div
          style={{
            gridColumn: '1 / -1',
            gridRow: '2',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Terminal />
        </div>
      </div>
    </div>
  );
};

