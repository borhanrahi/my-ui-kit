'use client';

import dynamic from 'next/dynamic';

interface PreviewComponentProps {
  componentPath: string;
}

export default function PreviewComponent({ componentPath }: PreviewComponentProps) {
  const ComponentToRender = dynamic(() => import(`@/registry/${componentPath}`), {
    ssr: false
  });

  return (
    <div className="p-4 bg-white rounded-md">
      <ComponentToRender />
    </div>
  );
}
