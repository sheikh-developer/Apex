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
import { ArtifactAction } from '../artifact-actions';

export class Artifact<K extends string, M = Record<string, unknown>> {
  kind: K;
  description: string;
  initialize: (params: { documentId: string; setMetadata: (metadata: M) => void }) => Promise<void>;
  onStreamPart: (params: { streamPart: any; setMetadata: (metadata: M) => void; setArtifact: (artifact: any) => void }) => void;
  content: (params: {
    mode: string;
    status: string;
    content: string;
    isCurrentVersion: boolean;
    currentVersionIndex: number;
    onSaveContent: (content: string) => void;
    getDocumentContentById: (id: number) => string;
    isLoading: boolean;
    metadata: M;
  }) => JSX.Element;
  actions: ArtifactAction[];
  toolbar: any[];

  constructor(params: {
    kind: K;
    description: string;
    initialize: (params: { documentId: string; setMetadata: (metadata: M) => void }) => Promise<void>;
    onStreamPart: (params: { streamPart: any; setMetadata: (metadata: M) => void; setArtifact: (artifact: any) => void }) => void;
    content: (params: {
      mode: string;
      status: string;
      content: string;
      isCurrentVersion: boolean;
      currentVersionIndex: number;
      onSaveContent: (content: string) => void;
      getDocumentContentById: (id: number) => string;
      isLoading: boolean;
      metadata: M;
    }) => JSX.Element;
    actions: any[];
    toolbar: any[];
  }) {
    this.kind = params.kind;
    this.description = params.description;
    this.initialize = params.initialize;
    this.onStreamPart = params.onStreamPart;
    this.content = params.content;
    this.actions = params.actions;
    this.toolbar = params.toolbar;
  }
}
