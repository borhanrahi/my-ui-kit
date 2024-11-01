'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function CodeHighlighter({ code }: { code: string }) {
  return (
    <SyntaxHighlighter 
      language="tsx"
      style={oneDark}
      customStyle={{
        backgroundColor: 'transparent',
        padding: '1.5rem',
        borderRadius: '0.5rem',
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
} 