import React, { useEffect, useState } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { motion } from 'framer-motion';

interface TerminalProps {
  logs?: string[];
}

const DEFAULT_LOGS = [
  '$ npm install',
  'added 1247 packages in 45s',
  '',
  '$ npm run dev',
  '> next dev',
  '',
  '  ▲ Next.js 14.0.0',
  '  - Local:        http://localhost:3000',
  '',
  '✓ Ready in 2.3s',
  '○ Compiling / ...',
  '✓ Compiled / in 1.2s',
];

export const Terminal: React.FC<TerminalProps> = ({ logs = DEFAULT_LOGS }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);

  useEffect(() => {
    // Show logs progressively based on frame
    const logDelay = fps * 0.5; // 0.5 seconds per log
    const logsToShow = Math.min(
      Math.floor(frame / logDelay) + 1,
      logs.length
    );
    setDisplayedLogs(logs.slice(0, logsToShow));
  }, [frame, fps, logs]);

  return (
    <motion.div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#1e1e1e',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Monaco, Menlo, "Courier New", monospace',
        fontSize: 12,
        color: '#d4d4d4',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Terminal Header */}
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
        <div style={{ display: 'flex', gap: '6px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ff5f57',
            }}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ffbd2e',
            }}
          />
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#28ca42',
            }}
          />
        </div>
        <span style={{ fontSize: 11, color: '#888' }}>Terminal</span>
      </div>

      {/* Terminal Content */}
      <div
        style={{
          flex: 1,
          padding: '16px',
          overflow: 'auto',
        }}
      >
        {displayedLogs.map((log, index) => (
          <div
            key={index}
            style={{
              marginBottom: '4px',
              color: log.startsWith('$') ? '#4ec9b0' : log.startsWith('✓') ? '#4ec9b0' : log.startsWith('○') ? '#dcdcaa' : '#d4d4d4',
            }}
          >
            {log || '\u00A0'}
          </div>
        ))}
        <span
          style={{
            display: 'inline-block',
            width: '8px',
            height: '16px',
            backgroundColor: '#ffffff',
            animation: 'blink 1s infinite',
          }}
        >
          ▋
        </span>
      </div>
    </motion.div>
  );
};

