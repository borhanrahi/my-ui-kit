'use client';

import { Suspense, Component, ReactNode } from 'react';
import dynamic from 'next/dynamic';

interface PreviewComponentProps {
  componentPath: string;
}

// Add Error Boundary class component
class ErrorBoundary extends Component<{ children: ReactNode, fallback: ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function PreviewComponent({ componentPath }: PreviewComponentProps) {
  const ComponentToRender = dynamic(() => import(`@/registry/${componentPath}`), {
    ssr: false,
    loading: () => <div>Loading component...</div>
  });

  return (
    <div className="p-4 bg-white rounded-md">
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>Error loading component</div>}>
          <ComponentToRender />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}
