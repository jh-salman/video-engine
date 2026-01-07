export enum TutorialStatus {
  IDEATING = 'IDEATING',
  GENERATING_VOICE = 'GENERATING_VOICE',
  RENDERING = 'RENDERING',
  COMPLETED = 'COMPLETED',
}

export interface CodeAction {
  file: string;
  action: 'create' | 'update' | 'delete';
  content: string;
  duration: number; // Duration in seconds
}

export interface AIScript {
  narration: string;
  codeActions: CodeAction[];
}

export interface Tutorial {
  id: string;
  title: string;
  topic: string;
  aiScript: AIScript;
  audioUrl?: string | null;
  videoUrl?: string | null;
  status: TutorialStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GenerateTutorialRequest {
  title: string;
  topic: string;
}

export interface GenerateTutorialResponse {
  tutorialId: string;
  status: TutorialStatus;
}

export interface RenderTutorialRequest {
  tutorialId: string;
}

export interface RenderTutorialResponse {
  tutorialId: string;
  status: TutorialStatus;
  videoUrl?: string;
}
