import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import docs from '@/configs/docs.json';
import { Metadata } from 'next';

// Define params type as Promise
type Params = Promise<{ componentName: string }>;

// Generate static paths
export async function generateStaticParams() {
  return docs.dataArray.flatMap((category) =>
    category.componentArray.map((component) => ({
      componentName: component.componentName,
    }))
  );
}

// Generate metadata with Promise params
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { componentName } = await params;
  return {
    title: `${componentName} Preview`,
  };
}

// Page component with Promise params
export default async function Page({
  params,
}: {
  params: Params;
}) {
  // Await the params
  const { componentName } = await params;

  // Find component
  const component = docs.dataArray
    .flatMap(category => category.componentArray)
    .find(comp => comp.componentName === componentName);

  if (!component) {
    notFound();
  }

  const ComponentPreview = component.filesrc
    ? dynamic(() => import(`../../../registry/${component.filesrc}`), {
        loading: () => <div>Loading preview...</div>,
      })
    : null;

  return (
    <section className="flex justify-center items-center min-h-screen rounded-md dark:bg-[#000000] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]">
      <div className="px-4 w-full">
        {ComponentPreview && (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentPreview />
          </Suspense>
        )}
      </div>
    </section>
  );
}