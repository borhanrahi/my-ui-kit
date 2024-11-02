'use client';

import { useState, useEffect } from 'react';
import { Pre } from 'codehike/code';
import * as shiki from 'shiki/bundle/web';
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
  const [tshighlighted, setTsHighlighted] = useState<string | null>(null);
  const [jshighlighted, setJsHighlighted] = useState<string | null>(null);

  useEffect(() => {
    const formatAndHighlightCode = async () => {
      try {
        // Transpile TypeScript to JavaScript
        const result = ts.transpileModule(codeblock, {
          compilerOptions: {
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ESNext,
            jsx: ts.JsxEmit.Preserve,
            removeComments: true,
          },
        });

        let jsCode = result.outputText.replace(/"use strict";\s*/, '');

        // Initialize the highlighter with specific theme
        const highlighter = await shiki.getHighlighter({
          themes: ['github-dark'],
          langs: ['typescript', 'javascript', 'tsx', 'jsx']
        });

        // Highlight TypeScript code
        const tsHighlighted = await highlighter.codeToHtml(codeblock, {
          lang: 'tsx',
          theme: 'github-dark'
        });

        // Highlight JavaScript code
        const jsHighlighted = await highlighter.codeToHtml(jsCode, {
          lang: 'javascript',
          theme: 'github-dark'
        });

        setTsHighlighted(tsHighlighted);
        setJsHighlighted(jsHighlighted);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error processing code:', error.message);
        } else {
          console.error('Unknown error occurred while processing code');
        }
      }
    };

    formatAndHighlightCode();
  }, [codeblock]);

  if (!tshighlighted || !jshighlighted) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: tshighlighted }} 
          />
        </TabsContent>
        <TabsContent value={'javascript'}>
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: jshighlighted }} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
