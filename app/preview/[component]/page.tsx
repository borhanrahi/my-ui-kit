import { notFound } from 'next/navigation';
import docs from '@/configs/docs.json';
import { extractCodeFromFilePath } from '@/lib/code';
import PreviewComponent from './PreviewComponent';
import CodeHighlighter from './CodeHighlighter';

type Props = {
  params: {
    component: string;
  };
};

export default async function PreviewPage({ params }: Props) {
  const { component } = params;

  const currComponent = docs.dataArray.reduce<any>((acc, componentItem) => {
    const file = componentItem?.componentArray?.find(
      (file) => file?.componentName === component
    );
    if (file) acc = file;
    return acc;
  }, null);

  if (!currComponent) {
    return notFound();
  }

  // Fetch the component code
  const code = await extractCodeFromFilePath(`registry/${currComponent.filesrc}`);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 space-y-8">
        <PreviewComponent componentPath={currComponent.filesrc} />
        
        <div className="rounded-lg border bg-[#011627] p-4">
          <CodeHighlighter code={code} />
        </div>
      </div>
    </div>
  );
}