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
import { Artifact } from "../../components/create-artifact";
import { ExampleComponent } from "../../components/example-component";
import { toast } from "sonner";
 
interface CustomArtifactMetadata {
  // Define metadata your custom artifact might need—the example below is minimal.
  info: string;
}
 
export const customArtifact = new Artifact<"custom", CustomArtifactMetadata>({
  kind: "custom",
  description: "A custom artifact for demonstrating custom functionality.",
  // Initialization can fetch any extra data or perform side effects
  initialize: async ({ documentId, setMetadata }) => {
    // For example, initialize the artifact with default metadata.
    setMetadata({
      info: `Document ${documentId} initialized.`,
    });
  },
  // Handle streamed parts from the server (if your artifact supports streaming updates)
  onStreamPart: ({ streamPart, setMetadata, setArtifact }) => {
    if (streamPart.type === "info-update") {
      setMetadata((metadata) => ({
        ...metadata,
        info: streamPart.content as string,
      }));
    }
    if (streamPart.type === "content-update") {
      setArtifact((draftArtifact) => ({
        ...draftArtifact,
        content: draftArtifact.content + (streamPart.content as string),
        status: "streaming",
      }));
    }
  },
  // Defines how the artifact content is rendered
  content: ({
    mode,
    status,
    content,
    isCurrentVersion,
    currentVersionIndex,
    onSaveContent,
    getDocumentContentById,
    isLoading,
    metadata,
  }) => {
    if (isLoading) {
      return <div>Loading custom artifact...</div>;
    }
 
    if (mode === "diff") {
      const oldContent = getDocumentContentById(currentVersionIndex - 1);
      const newContent = getDocumentContentById(currentVersionIndex);
      return (
        <div>
          <h3>Diff View</h3>
          <pre>{oldContent}</pre>
          <pre>{newContent}</pre>
        </div>
      );
    }
 
    return (
      <div className="custom-artifact">
        <ExampleComponent
          content={content}
          metadata={metadata}
          onSaveContent={onSaveContent}
          isCurrentVersion={isCurrentVersion}
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(content);
            toast.success("Content copied to clipboard!");
          }}
        >
          Copy
        </button>
      </div>
    );
  },
  // An optional set of actions exposed in the artifact toolbar.
  actions: [
    {
      icon: <span>⟳</span>,
      description: "Refresh artifact info",
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: "user",
          content: "Please refresh the info for my custom artifact.",
        });
      },
    },
  ],
  // Additional toolbar actions for more control
  toolbar: [
    {
      icon: <span>✎</span>,
      description: "Edit custom artifact",
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: "user",
          content: "Edit the custom artifact content.",
        });
      },
    },
  ],
});
