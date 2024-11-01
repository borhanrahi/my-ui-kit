import { notFound } from 'next/navigation';
import docs from '@/configs/docs.json';
import PreviewComponent from './PreviewComponent';

interface Props {
  params: { component: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function PreviewPage({ params }: Props) {
  if (!params?.component) {
    return notFound();
  }

  const currComponent = docs.dataArray.reduce<any>((acc, component) => {
    const file = component?.componentArray?.find(
      (file) => file?.componentName === params.component
    );
    if (file) acc = file;
    return acc;
  }, null);

  if (!currComponent) {
    return notFound();
  }

  return <PreviewComponent componentPath={currComponent.filesrc} />;
}