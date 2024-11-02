"use client";

import { useEffect, useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/website/ui/tabs';
import { Code, Eye } from 'lucide-react';
import ComponentPreview from './component-preview';
import { PreCoded } from './pre-coded';
import { CodeErrorBoundary } from './error-boundary';
import docs from '@/configs/docs.json';
import { SpecialComponents, MainComponents } from '@/configs/docs';
import { extractCodeFromFilePath } from '@/lib/code';

type ComponentCodePreview = {
  hasReTrigger?: boolean;
  name: string;
  children?: React.ReactNode;
  responsive?: boolean;
  isTab?: boolean;
  isFitheight?: boolean;
  isNotCopy?: boolean;
};

export type TCurrComponentProps = {
  componentName?: string;
  filesrc?: string;
  // ... other properties
};

export default function ComponentCodePreview({
  hasReTrigger = false,
  name,
  children,
  responsive = false,
  isTab = false,
  isNotCopy = false,
  isFitheight = false,
}: ComponentCodePreview) {
  const [fileContent, setFileContent] = useState<string>('');
  const [currComponent, setCurrComponent] = useState<any>(null);

  useEffect(() => {
    // Find component configuration
    const component = docs.dataArray.reduce<any>((acc, category) => {
      const file = category?.componentArray?.find(
        (file) => file.componentName === name
      );
      if (file) acc = file;
      return acc;
    }, null);

    setCurrComponent(component);

    // Load component code
    if (component?.filesrc) {
      const loadContent = async () => {
        try {
          const content = await extractCodeFromFilePath(`registry/${component.filesrc}`);
          setFileContent(content);
        } catch (error) {
          console.error('Error loading component code:', error);
        }
      };
      loadContent();
    }
  }, [name]);

  // Find component visibility config
  const componentConfig = [...SpecialComponents, ...MainComponents].find(
    comp => comp.href.includes(name)
  );
  
  const isCodeVisible = componentConfig?.codeVisible !== false;

  if (!currComponent) {
    return <div>Component not found</div>;
  }

  return (
    <div className='not-prose relative z-0 flex items-center justify-between pb-3'>
      <Tabs defaultValue={`${name}preview`} className='relative mt-1 w-full border-2 rounded-lg'>
        <TabsList className='absolute left-0 pl-1 top-0 z-10 flex h-12 w-full justify-start rounded-b-none rounded-t-lg border-b-2 bg-[#e7e7e7] backdrop-blur-lg dark:bg-gray-900'>
          <TabsTrigger
            value={`${name}preview`}
            className='flex gap-2 items-center data-[state=active]:bg-white data-[state=active]:border-b-2'
          >
            <Eye />
            Preview
          </TabsTrigger>
          {isCodeVisible && (
            <TabsTrigger
              value={`${name}code`}
              className='flex gap-2 items-center data-[state=active]:bg-white data-[state=active]:border-b-2'
            >
              <Code />
              Code
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent
          value={`${name}preview`}
          className='mt-0 px-0 pb-0 pt-12 ring-offset-background'
        >
          <ComponentPreview
            component={currComponent}
            hasReTrigger={hasReTrigger}
            code={fileContent}
            responsive={responsive}
            isNotCopy={isNotCopy}
            isFitheight={isFitheight}
          />
        </TabsContent>

        {isCodeVisible && (
          <TabsContent
            value={`${name}code`}
            className='mt-11 p-3 pt-2 pb-3 ring-offset-background'
          >
            <CodeErrorBoundary>
              {children || (
                <PreCoded
                  codeblock={fileContent}
                  classname="border-none"
                />
              )}
            </CodeErrorBoundary>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
