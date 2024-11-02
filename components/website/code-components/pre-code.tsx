'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
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
      <div className='relative mt-2'>
        <CopyButton code={codeblock.value} className='top-3.5' />
        <div className={cn("rounded-lg border bg-[#011627] overflow-hidden", classname)}>
          <SyntaxHighlighter 
            language={codeblock.lang}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              background: 'transparent',
            }}
          >
            {codeblock.value}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
