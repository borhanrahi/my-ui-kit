'use client';

import { Highlight, themes } from 'prism-react-renderer';
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
        <Highlight
          theme={themes.nightOwl}
          code={codeblock.value}
          language={codeblock.lang as any}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className="p-4 rounded-lg bg-[#011627] overflow-x-auto border mt-2">
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
      </div>
    </div>
  );
}
