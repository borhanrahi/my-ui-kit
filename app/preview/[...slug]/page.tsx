import { notFound } from 'next/navigation';
import docs from '@/configs/docs.json';
import ComponentBlocks from '@/components/website/code-components/component-block';

export async function generateStaticParams() {
  return docs.dataArray.flatMap((category) =>
    category.componentArray.map((component) => ({
      slug: [component.componentName],
    }))
  );
}

// Define the Props type with params as a Promise
type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const path = slug.join('/');

  return {
    title: `Preview: ${path}`,
    description: `Preview of component ${path}`,
  };
}

// Make the page component async and await params
export default async function PreviewPage({ params }: Props) {
  const { slug } = await params;
  const path = slug.join('/');

  const currComponent = docs.dataArray.reduce<any>((acc, component) => {
    const file = component?.componentArray?.find(
      (file) => file.componentName === path
    );
    if (file) acc = file;
    return acc;
  }, null);

  if (!currComponent) {
    return notFound();
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <main className="container mx-auto py-6">
        <ComponentBlocks componentfile={currComponent.filesrc} />
      </main>
    </div>
  );
}