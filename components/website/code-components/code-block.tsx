import { extractCodeFromFilePath } from '@/lib/code';
import { PreCode } from './pre-code';

type CodeBlockProps = {
  filePath: string;
};

export default async function CodeBlock({ filePath }: CodeBlockProps) {
  const fileContent = await extractCodeFromFilePath(filePath);

  return (
    <>
      <PreCode
        codeblock={{
          value: fileContent,
          lang: 'tsx',
          meta: '',
        }}
        classname={'border-none'}
      />
    </>
  );
}
