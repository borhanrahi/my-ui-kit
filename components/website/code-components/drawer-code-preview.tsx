'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ts from 'typescript';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/website/ui/tabs';
import {
  DrawerContent,
  ResponsiveDrawer,
} from '@/components/core/drawer/vaul-main';
import React from 'react';
import { Maximize2 } from 'lucide-react';
import { CopyButton } from './copy-button';
import ComponentBlocks from './component-block';
import { cn } from '@/lib/utils';

type ComponentCodePreview = {
  hasReTrigger?: boolean;
  name: string;
  children: React.ReactNode;
  isCard?: string;
  responsive?: boolean;
};

export default function DrawerCodePreview({
  hasReTrigger,
  name,
  children,
  isCard,
  responsive,
}: ComponentCodePreview) {
  const Codes = React.Children.toArray(children) as React.ReactElement[];
  
  let parsedCode;
  try {
    const codeblock = Codes[0]?.props?.codeblock;
    parsedCode = typeof codeblock === 'string' ? JSON.parse(codeblock) : codeblock;
  } catch (error) {
    console.error('Error parsing codeblock:', error);
    return <div>Error parsing code</div>;
  }

  if (!parsedCode) {
    return <div>No code content available</div>;
  }

  const result = ts.transpileModule(parsedCode.value || '', {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      jsx: ts.JsxEmit.Preserve,
      removeComments: true,
    },
  });

  const jsCode = result.outputText.replace(/"use strict";\s*/, '');

  return (
    <div
      className={cn(
        'my-2 w-full border-2 rounded-lg overflow-hidden dark:bg-[#080b11] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] relative grid place-content-center',
        isCard ? 'p-10 h-[550px]' : '2xl:p-20 py-16 px-2 h-fit'
      )}
    >
      <div className='not-prose'>
        <ComponentBlocks componentfile={parsedCode.filesrc} />
      </div>

      <div className='absolute top-2 right-2 flex justify-center items-center gap-2'>
        <CopyButton
          code={parsedCode.value}
          className='relative top-0 left-0'
        />
        <ResponsiveDrawer
          classname='max-w-screen-lg p-2'
          triggerContent={
            <button className='bg-foreground rounded-lg p-2 h-8 w-8 grid place-content-center'>
              <Maximize2 className='dark:text-black text-white h-5 w-5' />
            </button>
          }
        >
          <DrawerContent classname='2xl:max-h-[62vh] max-h-[80vh] overflow-auto'>
            <Tabs defaultValue="typescript">
              <TabsList className='absolute right-20 top-6 z-[1] h-9 p-0.5 border dark:border-background'>
                <TabsTrigger value="typescript" className='h-8'>
                  Ts
                </TabsTrigger>
                <TabsTrigger value="javascript" className='h-8'>
                  Js
                </TabsTrigger>
              </TabsList>
              <TabsContent value="typescript" className='mt-0 p-4'>
                <CopyButton code={parsedCode.value} className='top-6 right-10' />
                <SyntaxHighlighter 
                  language="tsx"
                  style={oneDark}
                  customStyle={{
                    backgroundColor: 'transparent',
                    padding: '1.5rem',
                    borderRadius: '0.5rem',
                  }}
                >
                  {parsedCode.value}
                </SyntaxHighlighter>
              </TabsContent>
              <TabsContent value="javascript" className='mt-0 p-4'>
                <CopyButton code={jsCode} className='top-6 right-10' />
                <SyntaxHighlighter 
                  language="javascript"
                  style={oneDark}
                  customStyle={{
                    backgroundColor: 'transparent',
                    padding: '1.5rem',
                    borderRadius: '0.5rem',
                  }}
                >
                  {jsCode}
                </SyntaxHighlighter>
              </TabsContent>
            </Tabs>
          </DrawerContent>
        </ResponsiveDrawer>
      </div>
    </div>
  );
}
