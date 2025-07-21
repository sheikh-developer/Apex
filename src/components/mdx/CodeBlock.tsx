import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  children: string;
  className?: string;
  project?: string;
  file?: string;
  type?: string;
  title?: string; // For mermaid diagrams
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  children, 
  className, 
  project, 
  file, 
  type, 
  title 
}) => {
  const language = className?.replace(/language-/, '') || 'text';

  return (
    <div className="code-block-container">
      {(project || file || type || title) && (
        <div className="code-block-meta">
          {project && <span>Project: {project}</span>}
          {file && <span>File: {file}</span>}
          {type && <span>Type: {type}</span>}
          {title && <span>Title: {title}</span>}
        </div>
      )}
      <SyntaxHighlighter style={dracula} language={language} customStyle={{ padding: '1em', borderRadius: '8px' }}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
