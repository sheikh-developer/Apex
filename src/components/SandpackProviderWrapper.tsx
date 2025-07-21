"use client";

import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackPreview, 
  SandpackConsole,
  useSandpack,
  SandpackSetup
} from '@codesandbox/sandpack-react';
import { createContext, useContext, useMemo } from 'react';
import { MonacoEditor } from './MonacoEditor';

interface SandboxFile {
  code: string;
  hidden?: boolean;
}

type SandpackFiles = Record<string, SandboxFile>;

interface SandpackContextActions {
  updateFile: (path: string, content: string) => void;
  runCommand: (command: string) => void;
}

const SandpackActionsContext = createContext<SandpackContextActions | null>(null);

export function SandpackProviderWrapper({
  files,
  children,
  customSetup,
}: {
  files: SandpackFiles;
  children: React.ReactNode;
  customSetup?: SandpackSetup;
}) {
  return (
    <SandpackProvider
      template="react"
      files={files}
      customSetup={customSetup}
      options={{ 
        bundlerURL: "https://sandpack-bundler.codesandbox.io",
        recompileMode: "immediate",
        recompileDelay: 300
      }}
    >
      <SandpackInternalActionsProvider>
        <SandpackLayout>
          <MonacoEditor />
          {children}
          <SandpackConsole showHeader={true} />
          <SandpackPreview />
        </SandpackLayout>
      </SandpackInternalActionsProvider>
    </SandpackProvider>
  );
}

function SandpackInternalActionsProvider({ children }: { children: React.ReactNode }) {
  const { sandpack } = useSandpack();

  const actions = useMemo(() => ({
    updateFile: (path: string, content: string) => {
      sandpack.updateFile(path, content);
    },
    runCommand: (command: string) => {
      // Commands are executed through the console input
      const consoleInput = document.querySelector('.sp-console-input') as HTMLInputElement;
      if (consoleInput) {
        consoleInput.value = command;
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter', 
          bubbles: true
        });
        consoleInput.dispatchEvent(enterEvent);
      }
    }
  }), [sandpack]);

  return (
    <SandpackActionsContext.Provider value={actions}>
      {children}
    </SandpackActionsContext.Provider>
  );
}

export function useSandpackActions() {
  const context = useContext(SandpackActionsContext);
  if (!context) {
    throw new Error('useSandpackActions must be used within SandpackProviderWrapper');
  }
  return context;
}
