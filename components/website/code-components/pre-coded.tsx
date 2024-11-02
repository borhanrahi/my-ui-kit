'use client';

import { useState, useEffect } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
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
    // Transpile TypeScript to JavaScript
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
          <Highlight theme={themes.nightOwl} code={codeblock} language="tsx">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className="p-4 rounded-lg bg-[#011627] overflow-x-auto">
                <code className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </code>
              </pre>
            )}
          </Highlight>
        </TabsContent>
        <TabsContent value={'javascript'}>
          <Highlight theme={themes.nightOwl} code={jsCode} language="javascript">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className="p-4 rounded-lg bg-[#011627] overflow-x-auto">
                <code className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </code>
              </pre>
            )}
          </Highlight>
        </TabsContent>
      </Tabs>
    </div>
  );
}
