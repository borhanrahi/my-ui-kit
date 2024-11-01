import React from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import docs from '@/configs/docs.json';

// Generate static paths
export async function generateStaticParams() {
  return docs.dataArray.flatMap((category) =>
    category.componentArray.map((component) => ({
      componentName: component.componentName,
    }))
  );
}

// Define metadata
export const metadata = {
  title: 'Component Preview',
  description: 'Live preview of the component',
};

// Define props type that matches Next.js 15 expectations
type PageProps = {
  params: { componentName: string };
};

// Use const for the component definition
const Page: React.FC<PageProps> = ({ params }) => {
  // Find component
  const component = docs.dataArray.flatMap(category => 
    category.componentArray
  ).find(comp => comp.componentName === params.componentName);

  if (!component) {
    notFound();
  }

  // Dynamic import of component
  const ComponentPreview = component.filesrc
    ? dynamic(() => import(`../../../registry/${component.filesrc}`), {
        loading: () => <div>Loading...</div>,
      })
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-black">
      <div className="w-full px-4">
        {ComponentPreview && <ComponentPreview />}
      </div>
    </div>
  );
};

export default Page;