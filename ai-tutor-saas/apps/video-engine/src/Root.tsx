import React from 'react';
import { Composition } from 'remotion';
import { Tutorial } from './Tutorial';
import type { AIScript } from '@ai-tutor-saas/types';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Tutorial"
        component={Tutorial}
        durationInFrames={300 * 30} // 5 minutes default (can be overridden)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          tutorialId: '',
          audioUrl: '',
          aiScript: {
            narration: '',
            codeActions: [],
          } as AIScript,
        }}
      />
    </>
  );
};

