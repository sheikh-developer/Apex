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
