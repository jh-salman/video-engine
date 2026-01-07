import React, { useEffect, useState, useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { motion } from 'framer-motion';
import type { CodeAction } from '@ai-tutor-saas/types';

interface VirtualIDEProps {
  codeActions: CodeAction[];
  audioDuration: number; // Total audio duration in seconds
}

// Calculate typing delay with deterministic "randomness" based on character position
function getTypingDelay(char: string, index: number): number {
  // Deterministic pseudo-random delay between 50-150ms per character
  // Using a simple hash function based on index for consistency
  const hash = (index * 9301 + 49297) % 233280;
  const normalized = hash / 233280;
  const baseDelay = 50 + normalized * 100; // 50-150ms range
  
  // Add 500ms pause after opening brackets
  if (['{', '(', '['].includes(char)) {
    return baseDelay + 500;
  }
  
  return baseDelay;
}

// Convert milliseconds to frames (assuming 30fps)
function msToFrames(ms: number, fps: number): number {
  return Math.floor((ms / 1000) * fps);
}

export const VirtualIDE: React.FC<VirtualIDEProps> = ({ codeActions, audioDuration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [displayedCode, setDisplayedCode] = useState<string>('');
  const [currentFile, setCurrentFile] = useState<string>('');
  
  // Cursor blinking based on frame (deterministic for Remotion)
  const cursorVisible = Math.floor(frame / (fps * 0.53)) % 2 === 0; // Blink every 530ms

  // Calculate timing for each code action
  const actionTimings = useMemo(() => {
    let currentTime = 0;
    return codeActions.map((action) => {
      const startTime = currentTime;
      const duration = action.duration;
      currentTime += duration;
      return {
        ...action,
        startTime,
        endTime: currentTime,
        startFrame: Math.floor(startTime * fps),
        endFrame: Math.floor(currentTime * fps),
      };
    });
  }, [codeActions, fps]);

  // Find current action based on frame
  const currentActionIndex = useMemo(() => {
    const currentTime = frame / fps;
    return actionTimings.findIndex(
      (timing) => currentTime >= timing.startTime && currentTime < timing.endTime
    );
  }, [frame, fps, actionTimings]);

  const currentAction = currentActionIndex >= 0 ? actionTimings[currentActionIndex] : null;

  // Calculate displayed code based on current frame
  useEffect(() => {
    if (!currentAction) {
      setDisplayedCode('');
      setCurrentFile('');
      return;
    }

    setCurrentFile(currentAction.file);
    const actionStartFrame = currentAction.startFrame;
    const relativeFrame = frame - actionStartFrame;
    
    // Calculate how many characters to show based on typing speed
    const content = currentAction.content;
    let charIndex = 0;
    let accumulatedDelay = 0;
    
    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      const delay = getTypingDelay(char, i);
      accumulatedDelay += delay;
      
      const delayFrames = msToFrames(accumulatedDelay, fps);
      if (relativeFrame >= delayFrames) {
        charIndex = i + 1;
      } else {
        break;
      }
    }
    
    setDisplayedCode(content.substring(0, Math.min(charIndex, content.length)));
  }, [frame, currentAction, fps]);

  // Breathing animation for UI
  const breathingScale = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 100,
      mass: 1,
    },
    from: 1,
    to: 1.02,
  });

  return (
    <motion.div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#1e1e1e',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Monaco, Menlo, "Courier New", monospace',
        fontSize: 14,
        color: '#d4d4d4',
      }}
      animate={{
        scale: breathingScale,
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    >
      {/* Tab Bar */}
      <div
        style={{
          backgroundColor: '#2d2d2d',
          padding: '8px 16px',
          borderBottom: '1px solid #3e3e3e',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            backgroundColor: '#1e1e1e',
            padding: '4px 12px',
            borderRadius: '4px 4px 0 0',
            borderTop: '2px solid #007acc',
            color: '#ffffff',
            fontSize: 12,
          }}
        >
          {currentFile || 'Untitled'}
        </div>
      </div>

      {/* Code Editor */}
      <div
        style={{
          flex: 1,
          padding: '16px',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <pre
          style={{
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            lineHeight: 1.6,
          }}
        >
          <code>{displayedCode}</code>
          {cursorVisible && (
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '18px',
                backgroundColor: '#ffffff',
                marginLeft: '2px',
                animation: 'blink 1s infinite',
              }}
            >
              |
            </span>
          )}
        </pre>
      </div>

      {/* Status Bar */}
      <div
        style={{
          backgroundColor: '#007acc',
          padding: '4px 16px',
          fontSize: 11,
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>Ln {displayedCode.split('\n').length}, Col {displayedCode.split('\n').pop()?.length || 0}</span>
        <span>{currentAction?.action.toUpperCase() || 'READY'}</span>
      </div>
    </motion.div>
  );
};

