import React from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import docs from '@/configs/docs.json';

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
type Props = {
  params: Promise<{ componentName: string }>
  searchParams?: Promise<Record<string, string | string[]>>
}

// Use const for the component definition
const Page: React.FC<Props> = async ({ params }) => {
  // Await the params before using
  const { componentName } = await params;

  // Find component
  const component = docs.dataArray.flatMap(category => 
    category.componentArray
  ).find(comp => comp.componentName === componentName);

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