'use client';

import { cn } from '@/lib/utils';
import { Copy, CheckCheck } from 'lucide-react';
import { useState } from 'react';

interface CopyButtonProps {
  code: string;
  className?: string;
}

export function CopyButton({
  code,
  className,
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    }
  };

  return (
    <button
      className={cn(
        'absolute right-2 top-2 cursor-pointer dark:bg-gray-950 backdrop-blur-2xl bg-white rounded-md border',
        className
      )}
      onClick={handleCopy}
    >
      <div
        className={`inset-0 transform transition-all duration-300 w-9 h-8 grid place-content-center ${
          isCopied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <Copy className='h-4 w-4 text-foreground/80' />
      </div>
      <div
        className={`absolute inset-0 transform transition-all duration-300 w-8 h-8 grid place-content-center ${
          isCopied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <CheckCheck className='h-4 w-4 text-foreground/80' />
      </div>
    </button>
  );
}
