'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyButton } from './copy-button';
import { cn } from '@/lib/utils';

export function PreCode({
  codeblock,
  classname,
  cssclass,
  metahide,
}: {
  codeblock: {
    value: string;
    lang: string;
    meta: string;
  };
  classname?: string;
  cssclass?: string;
  metahide?: boolean;
}) {
  return (
    <div className={cn('relative z-[2]', cssclass)}>
      {!metahide && codeblock.meta && (
        <div className='text-left text-sm px-2 py-1 mt-3 border-dotted rounded-md bg-primary-foreground w-fit'>
          {codeblock.meta}
        </div>
      )}
      <div className='relative'>
        <CopyButton code={codeblock.value} classname='top-3.5' />
        <SyntaxHighlighter 
          language={codeblock.lang}
          style={oneDark}
          customStyle={{
            backgroundColor: 'transparent',
            padding: '1.5rem',
            borderRadius: '0.5rem',
          }}
        >
          {codeblock.value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
