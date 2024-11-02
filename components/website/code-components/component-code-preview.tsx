"use client";

import { useEffect, useState, Suspense } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/website/ui/tabs';
import docs from '@/configs/docs.json';

import ComponentPreview from './component-preview';
import { extractCodeFromFilePath } from '@/lib/code';
import React from 'react';
import { Code, Eye } from 'lucide-react';
import { PreCoded } from './pre-coded';
import { SpecialComponents, MainComponents } from '@/configs/docs';

type ComponentCodePreview = {
  component: React.ReactElement;
  hasReTrigger?: boolean;
  name: string;
  children: React.ReactNode; //
  responsive?: boolean;
  isTab?: boolean;
  isFitheight?: boolean;
  isNotCopy?: boolean;
};
export type TCurrComponentProps = {
  componentName: string;
  iframeSrc?: string;
  componentSrc?: React.LazyExoticComponent<React.FC<{}>>;
  filesrc?: string;
  examplePreview?: string;
  compIframeSrc?: string;
  filesArray?: any;
};

export default function ComponentCodePreview({
  hasReTrigger,
  name,
  children,
  responsive,
  isTab = false,
  isNotCopy = false,
  isFitheight = false,
}: ComponentCodePreview) {
  const [fileContent, setFileContent] = useState<string>('');

  const currComponent = docs.dataArray.reduce<TCurrComponentProps | null>((acc, component) => {
    const file = component?.componentArray?.find(
      (file) => file.componentName === name
    );
    if (file) acc = file;
    return acc;
  }, null);

  useEffect(() => {
    if (currComponent?.filesrc) {
      fetch(`/api/code?path=registry/${currComponent.filesrc}`)
        .then(res => res.json())
        .then(data => {
          if (data.content) {
            setFileContent(data.content);
          }
        })
        .catch(console.error);
    }
  }, [currComponent]);

  if (!currComponent) {
    return <div>Component not found</div>;
  }

  // Find the component config by matching the component name with the URL path
  const componentConfig = [...SpecialComponents, ...MainComponents].find(
    comp => comp.href.includes(name)
  );
  
  const isCodeVisible = componentConfig?.codeVisible !== false;

  return (
    <div className='not-prose relative z-0 flex items-center justify-between pb-3'>
      <Tabs
        defaultValue={`${name}preview`}
        className='relative mt-1 w-full border-2 rounded-lg'
      >
        <TabsList className='absolute left-0 pl-1 top-0 z-10 flex h-12 w-full justify-start rounded-b-none rounded-t-lg border-b-2 border-t-0 border-x-0  bg-border/40 backdrop-blur-lg dark:bg-gray-900'>
          <TabsTrigger
            value={`${name}preview`}
            className='flex gap-2 items-center data-[state=active]:bg-white data-[state=active]:border-b-2 '
          >
            <Eye className='w-5 h-5' /> Preview
          </TabsTrigger>
          <TabsTrigger
            value={`${name}code`}
            className='flex gap-2 items-center data-[state=active]:bg-white data-[state=active]:border-b-2'
            disabled={!isCodeVisible}
          >
            <Code className='w-5 h-5' /> Code
          </TabsTrigger>
        </TabsList>
        <TabsContent
          className='mt-0 px-0 pb-0 pt-12 ring-offset-background'
          value={`${name}preview`}
        >
          <ComponentPreview
            hasReTrigger={hasReTrigger}
            component={currComponent}
            code={fileContent}
            responsive={responsive}
            isNotCopy={!isCodeVisible}
            isFitheight={isFitheight}
          />
        </TabsContent>
        <TabsContent className='mt-11' value={`${name}code`}>
          {!isTab && <PreCoded codeblock={fileContent} />}
          {children !== undefined && <div className='p-4 pt-2'>{children}</div>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
