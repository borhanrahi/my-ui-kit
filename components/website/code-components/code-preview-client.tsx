'use client';

import { Suspense } from 'react';
import { PreCoded } from './pre-coded';
import { CodeErrorBoundary } from './error-boundary';

export function CodePreviewClient({ code }: { code: string }) {
  return (
    <CodeErrorBoundary>
      <Suspense fallback={<div>Loading code preview...</div>}>
        <PreCoded codeblock={code} />
      </Suspense>
    </CodeErrorBoundary>
  );
}