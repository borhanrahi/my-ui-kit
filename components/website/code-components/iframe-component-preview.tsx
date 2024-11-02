'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/website/ui/tabs';
import ComponentPreview from './component-preview';
import { Code, Eye } from 'lucide-react';
import { ReactNode } from 'react';

interface IframeComponentPreviewProps {
  name: string;
  hasReTrigger?: boolean;
  responsive?: boolean;
  isFitheight?: boolean;
  children?: ReactNode;
  iframelink?: string;
}

export default function IframeComponentPreview({
  name,
  hasReTrigger = false,
  responsive = false,
  isFitheight = false,
  children,
  iframelink,
}: IframeComponentPreviewProps) {
  if (!name) {
    return <div>Component name is required</div>;
  }

  return (
    <Tabs
      defaultValue={`${name}preview`}
      className='relative mt-1 w-full border-2 rounded-lg'
    >
      <TabsList className='absolute left-0 pl-1 top-0 z-10 flex h-12 w-full justify-start rounded-b-none rounded-t-lg border-b-2 bg-[#e7e7e7] backdrop-blur-lg dark:bg-gray-900'>
        <TabsTrigger
          value={`${name}preview`}
          className='flex gap-2 items-center data-[state=active]:bg-white data-[state=active]:border-b-2'
        >
          <Eye />
          Preview
        </TabsTrigger>
        <TabsTrigger
          value={`${name}code`}
          className='flex gap-2 items-center data-[state=active]:bg-white data-[state=active]:border-b-2'
        >
          <Code />
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent
        className='mt-0 px-0 pb-0 pt-12 ring-offset-background'
        value={`${name}preview`}
      >
        <ComponentPreview
          hasReTrigger={hasReTrigger}
          iframeComponent={iframelink}
          code={''}
          responsive={responsive}
          isNotCopy={true}
          isFitheight={isFitheight}
        />
      </TabsContent>
      <TabsContent
        className='mt-11 p-3 pt-2 pb-3 ring-offset-background'
        value={`${name}code`}
      >
        {children}
      </TabsContent>
    </Tabs>
  );
}
