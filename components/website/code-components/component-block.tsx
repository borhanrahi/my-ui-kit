'use client';

import { Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';

type CodeBlockProps = {
  componentfile: string;
  classname?: string;
};

export default function ComponentBlocks({
  componentfile,
  classname,
}: CodeBlockProps) {
  const MemoizedComponentPreview = useMemo(() => {
    return componentfile
      ? dynamic(() => import(`../../../registry/${componentfile}`), {
          loading: () => (
            <div className="grid place-content-center min-h-screen bg-background">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
                Loading...
              </div>
            </div>
          ),
          ssr: true
        })
      : null;
  }, [componentfile]);

  return (
    <Suspense
      fallback={
        <div className="grid place-content-center min-h-screen bg-background">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
            Loading...
          </div>
        </div>
      }
    >
      {MemoizedComponentPreview ? (
        <MemoizedComponentPreview />
      ) : (
        <div>Component not found</div>
      )}
    </Suspense>
  );
}
