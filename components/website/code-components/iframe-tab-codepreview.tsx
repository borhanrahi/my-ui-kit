'use client';

import { z } from 'zod';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/website/ui/tabs';
import { PreCode } from './pre-code';

type TabCodeBlock = {
  value: string;
  lang: string;
  meta: string;
};

interface IframeTabCodePreviewProps {
  tabs: TabCodeBlock[];
}

export default function IframeTabCodePreview(props: IframeTabCodePreviewProps) {
  const { tabs } = props;

  if (!tabs || tabs.length === 0) return null;

  return (
    <>
      {tabs.length > 1 ? (
        <Tabs defaultValue={tabs[0]?.meta}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.meta} value={tab.meta} className='h-8'>
                {tab.meta}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.meta} value={tab.meta} className='mt-0'>
              <PreCode
                codeblock={tab}
                classname='border-none'
                metahide
              />
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <>
          {tabs.map((tab) => (
            <PreCode
              key={tab.meta}
              codeblock={tab}
              classname='border-none'
              metahide
            />
          ))}
        </>
      )}
    </>
  );
}
