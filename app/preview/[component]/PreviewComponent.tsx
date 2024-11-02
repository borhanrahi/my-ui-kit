'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

interface PreviewComponentProps {
  componentPath: string;
}

export default function PreviewComponent({ componentPath }: PreviewComponentProps) {
  const ComponentToRender = dynamic(() => import(`@/registry/${componentPath}`), {
    loading: () => <div className="grid place-content-center min-h-screen">Loading...</div>,
    ssr: true
  });

  return (
    <Suspense fallback={<div className="grid place-content-center min-h-screen">Loading...</div>}>
      <ComponentToRender />
    </Suspense>
  );
}
