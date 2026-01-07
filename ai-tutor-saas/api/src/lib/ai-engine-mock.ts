import type { AIScript, CodeAction } from '@ai-tutor-saas/types';

export interface GenerateScriptParams {
  title: string;
  topic: string;
}

// Dummy AI script generator with realistic data
export async function generateAIScriptMock(
  params: GenerateScriptParams
): Promise<AIScript> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const dummyScript: AIScript = {
    narration: `Welcome to this tutorial on ${params.title}. Today we'll be exploring ${params.topic}. 

Let's start by creating a new React component. First, we'll set up the basic structure with imports and the component function. 

Next, we'll add some state management using React hooks. This will allow us to track user interactions and update the UI dynamically.

Finally, we'll add some styling to make our component look professional and modern. We'll use Tailwind CSS for this purpose.

That's it! You now have a fully functional React component. Let's test it to make sure everything works correctly.`,

    codeActions: [
      {
        file: 'src/components/Button.tsx',
        action: 'create',
        content: `import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {label}
    </button>
  );
};`,
        duration: 8,
      },
      {
        file: 'src/components/Button.tsx',
        action: 'update',
        content: `import React, { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await onClick();
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
    >
      {isLoading ? 'Loading...' : label}
    </button>
  );
};`,
        duration: 10,
      },
      {
        file: 'src/app/page.tsx',
        action: 'create',
        content: `import { Button } from '@/components/Button';

export default function Home() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome</h1>
      <Button label="Click Me" onClick={handleClick} />
    </div>
  );
}`,
        duration: 7,
      },
    ],
  };

  return dummyScript;
}

