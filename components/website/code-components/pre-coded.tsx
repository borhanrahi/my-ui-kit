'use client';

import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/website/ui/tabs';
import { CopyButton } from './copy-button';
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
    // Only attempt transpilation if code exists
    if (codeblock) {
      try {
        // Use dynamic import for typescript compiler
        import('typescript').then((ts) => {
          const result = ts.transpileModule(codeblock, {
            compilerOptions: {
              module: ts.ModuleKind.ESNext,
              target: ts.ScriptTarget.ESNext,
              jsx: ts.JsxEmit.Preserve,
              removeComments: true,
            },
          });
          setJsCode(result.outputText.replace(/"use strict";\s*/, ''));
        }).catch(err => {
          console.error('Error loading TypeScript:', err);
          setJsCode(codeblock); // Fallback to original code
        });
      } catch (error) {
        console.error('Error transpiling code:', error);
        setJsCode(codeblock); // Fallback to original code
      }
    }
  }, [codeblock]);

  return (
    <div className='relative'>
      <Tabs defaultValue='typescript'>
        <TabsList
          className={cn(
            'absolute right-20 top-6 z-[1] h-9 p-0.5 border dark:border-background',
            tabclassname
          )}
        >
          <TabsTrigger value='typescript' className='h-8 text-foreground'>
            Ts
          </TabsTrigger>
          <TabsTrigger value='javascript' className='h-8 text-foreground'>
            Js
          </TabsTrigger>
        </TabsList>
        <TabsContent value='typescript'>
          <div className={cn("rounded-lg border bg-[#011627] overflow-hidden", classname)}>
            <CopyButton code={codeblock} className={copyclass || 'top-3.5'} />
            <SyntaxHighlighter 
              language="tsx"
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                background: 'transparent',
              }}
            >
              {codeblock}
            </SyntaxHighlighter>
          </div>
        </TabsContent>
        <TabsContent value='javascript'>
          <div className={cn("rounded-lg border bg-[#011627] overflow-hidden", classname)}>
            <CopyButton code={jsCode} className={copyclass || 'top-3.5'} />
            <SyntaxHighlighter 
              language="javascript"
              style={oneDark}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                background: 'transparent',
              }}
            >
              {jsCode}
            </SyntaxHighlighter>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
