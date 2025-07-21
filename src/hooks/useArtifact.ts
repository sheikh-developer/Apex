/******************************************************************************
Copyright (c) Likhon Sheikh - @likhonsheikh on Telegram

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
'use client';

import useSWR from 'swr';
import { useCallback, useMemo } from 'react';

// Define types for better type safety since we can't access the artifact file
export type ArtifactKind = 'text' | 'code' | 'image' | 'sheet';
export type ArtifactStatus = 'idle' | 'loading' | 'success' | 'error' | 'streaming';

export interface BoundingBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface UIArtifact {
  documentId: string;
  content: string;
  kind: ArtifactKind;
  title: string;
  status: ArtifactStatus;
  isVisible: boolean;
  boundingBox: BoundingBox;
}

interface ArtifactMetadata {
  [key: string]: unknown;
}

interface ArtifactHookReturn {
  artifact: UIArtifact;
  setArtifact: (updater: UIArtifact | ((current: UIArtifact) => UIArtifact)) => void;
  metadata: ArtifactMetadata | null;
  setMetadata: (metadata: ArtifactMetadata) => void;
}

export const initialArtifactData: UIArtifact = {
  documentId: 'init',
  content: '',
  kind: 'text',
  title: '',
  status: 'idle',
  isVisible: false,
  boundingBox: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
};

type Selector<T> = (state: UIArtifact) => T;

/**
 * Custom hook to select specific values from the artifact state
 * @param selector Function that selects a value from the artifact state
 * @returns The selected value
 */
export function useArtifactSelector<Selected>(selector: Selector<Selected>): Selected {
  const { data: localArtifact } = useSWR<UIArtifact>('artifact', null, {
    fallbackData: initialArtifactData,
    revalidateOnFocus: false,
  });

  return useMemo(() => 
    selector(localArtifact ?? initialArtifactData),
    [localArtifact, selector]
  );
}

/**
 * Custom hook to manage artifact state and metadata
 * @returns An object containing artifact state and setters
 */
export function useArtifact(): ArtifactHookReturn {
  const { data: localArtifact, mutate: setLocalArtifact } = useSWR<UIArtifact>(
    'artifact', 
    null,
    {
      fallbackData: initialArtifactData,
      revalidateOnFocus: false,
    },
  );

  const artifact = useMemo(() => 
    localArtifact ?? initialArtifactData,
    [localArtifact]
  );

  const setArtifact = useCallback(
    (updaterFn: UIArtifact | ((currentArtifact: UIArtifact) => UIArtifact)) => {
      setLocalArtifact((currentArtifact) => {
        const artifactToUpdate = currentArtifact ?? initialArtifactData;
        return typeof updaterFn === 'function' 
          ? updaterFn(artifactToUpdate) 
          : updaterFn;
      }, false); // Disable revalidation on set
    },
    [setLocalArtifact],
  );

  const metadataKey = useMemo(() => 
    artifact.documentId ? `artifact-metadata-${artifact.documentId}` : null,
    [artifact.documentId]
  );
  
  const { data: localArtifactMetadata, mutate: setLocalArtifactMetadata } =
    useSWR<ArtifactMetadata | null>(
      metadataKey as any,
      null,
      { fallbackData: null }
    );

  return {
    artifact,
    setArtifact,
    metadata: localArtifactMetadata ?? null,
    setMetadata: setLocalArtifactMetadata,
  };
}
