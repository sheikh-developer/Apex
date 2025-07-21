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
// This is a placeholder file for the ExampleComponent.
// In a real project, this would contain the actual implementation of the ExampleComponent.
// For the purpose of this task, we are creating a dummy file to resolve the import error.

import React from 'react';

interface ExampleComponentProps {
  content: string;
  metadata: any;
  onSaveContent: (content: string) => void;
  isCurrentVersion: boolean;
}

export const ExampleComponent: React.FC<ExampleComponentProps> = ({
  content,
  metadata,
  onSaveContent,
  isCurrentVersion,
}) => {
  return (
    <div>
      <h4>Example Component</h4>
      <p>Content: {content}</p>
      <p>Metadata Info: {metadata.info}</p>
      <button onClick={() => onSaveContent("New content from example component")}>
        Save New Content
      </button>
    </div>
  );
};
