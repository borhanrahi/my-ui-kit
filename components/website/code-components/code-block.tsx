'use client';

import { useEffect, useState } from 'react';
import { PreCode } from './pre-code';
import { extractCodeFromFilePath } from '@/lib/utils';

type CodeBlockProps = {
  componentfile: string;
  classname?: string;
};

export default function CodeBlock({ componentfile, classname }: CodeBlockProps) {
  const [fileContent, setFileContent] = useState<string>('');

  useEffect(() => {
    const loadContent = async () => {
      const content = await extractCodeFromFilePath(`registry/${componentfile}`);
      setFileContent(content);
    };
    
    loadContent();
  }, [componentfile]);

  return (
    <div className="relative">
      <PreCode
        codeblock={{
          value: fileContent,
          lang: 'tsx',
          meta: '',
        }}
        classname={classname}
      />
    </div>
  );
}
