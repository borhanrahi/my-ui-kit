import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import docs from '@/configs/docs.json';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return docs.dataArray.flatMap((category) =>
    category.componentArray.map((component) => ({
      componentName: component.componentName,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { componentName: string };
}): Promise<Metadata> {
  return {
    title: `${params.componentName} Preview`,
  };
}

export default async function Page({
  params,
}: {
  params: { componentName: string };
}) {
  const component = await Promise.resolve(
    docs.dataArray
      .flatMap(category => category.componentArray)
      .find(comp => comp.componentName === params.componentName)
  );

  if (!component) {
    notFound();
  }

  const ComponentPreview = component.filesrc
    ? dynamic(() => import(`../../../registry/${component.filesrc}`))
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