/******************************************************************************
Copyright (c) Likhon Sheikh - @likhonsheikh on Telegram

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
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
