"use client";

import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview } from "@codesandbox/sandpack-react";
import { monokaiExtended } from "@codesandbox/sandpack-themes";

interface SandpackViewerProps {
  code: string;
  className?: string;
  branch?: string;
  showDiff?: boolean;
}

export const SandpackViewer: React.FC<SandpackViewerProps> = ({ 
  code, 
  className, 
  branch = 'main', 
  showDiff = false 
}) => {
  return (
    <div className={`border rounded-lg overflow-hidden ${className}`} style={{ height: '500px' }}>
      <div className="bg-zinc-800 px-4 py-2 flex justify-between items-center border-b border-zinc-700">
        <span className="text-sm font-mono text-zinc-300">
          Branch: <span className="text-emerald-400">{branch}</span>
        </span>
        {showDiff && (
          <span className="text-xs px-2 py-1 bg-blue-600/20 text-blue-400 rounded">
            Diff Mode
          </span>
        )}
      </div>
      <SandpackProvider
        template="react"
        theme={monokaiExtended}
        files={{
          "/App.tsx": {
            code,
            active: !showDiff,
            ...(showDiff && {
              // Use the same code for both files in diff view
              // In a real implementation, you'd fetch the main branch code
              codeToCompare: code 
            })
          },
          "/package.json": {
            code: JSON.stringify({
              dependencies: {
                "react": "^18.0.0",
                "react-dom": "^18.0.0",
                "ai": "beta",                  // NEW
                "@ai-sdk/google": "beta",      // NEW
                "zod": "^3.22.4"               // Added as it's used by generated code
              }
            }, null, 2),
            hidden: true,
          },
          // tsconfig.json and other boilerplate files are usually provided by the template
          // but if needed:
          "/tsconfig.json": {
            code: JSON.stringify({ compilerOptions: { lib: ["dom", "dom.iterable", "esnext"], allowJs: true, skipLibCheck: true, esModuleInterop: true, allowSyntheticDefaultImports: true, strict: true, forceConsistentCasingInFileNames: true, noEmit: true, incremental: true, jsx: "preserve", module: "esnext", moduleResolution: "node", resolveJsonModule: true, isolatedModules: true, plugins: [{ name: "next" }], baseUrl: ".", paths: { "*": ["./*"] } }, include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"], exclude: ["node_modules"] }, null, 2),
            hidden: true
          }
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor showLineNumbers={true} showTabs={true} />
          <SandpackPreview />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};
