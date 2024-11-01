import { notFound } from 'next/navigation';
import docs from '@/configs/docs.json';
import PreviewComponent from './PreviewComponent';

interface Props {
  params: { component: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function PreviewPage({ params }: Props) {
  if (!params) {
    return notFound();
  }

  const { component } = await params;

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

  return <PreviewComponent componentPath={currComponent.filesrc} />;
}