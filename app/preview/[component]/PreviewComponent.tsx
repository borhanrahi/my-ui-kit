'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

interface PreviewComponentProps {
  componentPath: string;
  
}

export default function PreviewComponent({ componentPath }: PreviewComponentProps) {
  const ComponentToRender = dynamic(() => import(`@/registry/${componentPath}`), {
    loading: () => (
      <div className="grid place-content-center min-h-screen bg-background">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent" />
          Loading...
        </div>
      </div>
    ),
    ssr: true
  });

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
      <div className="w-full min-h-screen flex items-center justify-center bg-background">
        <ComponentToRender />
      </div>
    </Suspense>
  );
}
