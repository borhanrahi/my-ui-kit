'use client';

import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ts from 'typescript';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/website/ui/tabs';
import { cn } from '@/lib/utils';

export function PreCoded({
  codeblock,
  classname,
  tabclassname,
  copyclass,
}: {
  codeblock: string;
  classname?: string;
  tabclassname?: string;
  copyclass?: string;
}) {
  const [jsCode, setJsCode] = useState('');

  useEffect(() => {
    const result = ts.transpileModule(codeblock, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ESNext,
        jsx: ts.JsxEmit.Preserve,
        removeComments: true,
      },
    });

    setJsCode(result.outputText.replace(/"use strict";\s*/, ''));
  }, [codeblock]);

  return (
    <div className='relative'>
      <Tabs defaultValue={'typescript'}>
        <TabsList
          className={cn(
            'absolute right-20 top-6 z-[1] h-9 p-0.5 border dark:border-background',
            tabclassname
          )}
        >
          <TabsTrigger value={'typescript'} className='h-8 text-foreground'>
            Ts
          </TabsTrigger>
          <TabsTrigger value={'javascript'} className='h-8 text-foreground'>
            Js
          </TabsTrigger>
        </TabsList>
        <TabsContent value={'typescript'}>
          <SyntaxHighlighter 
            language="tsx"
            style={oneDark}
            customStyle={{
              backgroundColor: 'transparent',
              padding: '1.5rem',
              borderRadius: '0.5rem',
            }}
          >
            {codeblock}
          </SyntaxHighlighter>
        </TabsContent>
        <TabsContent value={'javascript'}>
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
    </div>
  );
}
