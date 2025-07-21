'use client';

import { useEffect, useState } from 'react';
import { SandpackViewer } from '../../../components/sandpack-viewer';
import { useRouter } from 'next/navigation';

interface PreviewData {
  code: string;
  branch: string;
  timestamp: string;
}

export default function PreviewPage({ params }: { params: { branch: string } }) {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchPreview() {
      try {
        const response = await fetch('/api/preview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ branch: params.branch }),
        });

        if (!response.ok) {
          throw new Error('Failed to load preview');
        }

        const data = await response.json();
        setPreviewData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchPreview();
  }, [params.branch]);

  if (loading) return <div className="p-4">Loading preview...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-zinc-900 p-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold">
          Preview: <span className="text-emerald-400">{params.branch}</span>
        </h1>
        <p className="text-sm text-zinc-400">
          Last updated: {previewData?.timestamp}
        </p>
      </div>
      
      {previewData && (
        <SandpackViewer 
          code={previewData.code} 
          branch={params.branch}
          className="flex-1"
        />
      )}
    </div>
  );
}
