'use client';

import { cn } from '@/lib/utils';
import {
  Check,
  Copy,
  ExternalLink,
  Monitor,
  RotateCw,
  Smartphone,
  Tablet,
} from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { TCurrComponentProps } from './component-code-preview';
import dynamic from 'next/dynamic';

type ComponentPreviewProps = {
  component?: TCurrComponentProps;
  hasReTrigger?: boolean;
  className?: string;
  code: string;
  responsive?: boolean;
  isFitheight?: boolean;
  isNotCopy?: boolean;
  iframeComponent?: string;
  previewComp?: boolean;
  hideDeviceOpt?: boolean;
};

export default function ComponentPreview({
  component,
  hasReTrigger = false,
  className,
  code,
  responsive,
  isFitheight,
  isNotCopy,
  iframeComponent,
}: ComponentPreviewProps) {
  const [reTriggerKey, setReTriggerKey] = useState<number>(0);
  const [hasCheckIcon, setHasCheckIcon] = useState(false);
  const [width, setWidth] = useState('100%');
  const [mode, setMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleReTrigger = () => {
    if (hasReTrigger) {
      setReTriggerKey((prevKey) => prevKey + 1);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setHasCheckIcon(true);

    setTimeout(() => {
      setHasCheckIcon(false);
    }, 1000);
  };

  const MemoizedComponentPreview = useMemo(() => {
    return component?.filesrc
      ? dynamic(() => import(`../../../registry/${component.filesrc}`), {
          loading: () => (
            <div className='h-[400px] grid place-content-center'>
              Loading preview...
            </div>
          ),
        })
      : null;
  }, [component?.filesrc]);

  return (
    <>
      <div className='absolute right-1 top-0 z-[10] flex h-12 items-center gap-2'>
        <div className='flex items-center gap-2 rounded-lg border bg-background p-1'>
          <button
            className={cn(
              "rounded-md p-1",
              mode === 'desktop' && "bg-primary text-primary-foreground"
            )}
            onClick={() => {
              setMode('desktop');
              setWidth('100%');
            }}
          >
            <Monitor className='h-5 w-5' />
          </button>
          <button
            onClick={() => {
              setMode('tablet');
              setWidth('768px');
            }}
            className={cn(
              "rounded-md p-1",
              mode === 'tablet' && "bg-primary text-primary-foreground"
            )}
          >
            <Tablet className='h-5 w-5' />
          </button>
          <button
            onClick={() => {
              setMode('mobile');
              setWidth('375px');
            }}
            className={cn(
              "rounded-md p-1",
              mode === 'mobile' && "bg-primary text-primary-foreground"
            )}
          >
            <Smartphone className='h-4 w-4' />
          </button>
        </div>
        {!isNotCopy && (
          <button
            className='relative grid cursor-pointer place-content-center rounded-lg border bg-background p-2 px-2.5'
            onClick={onCopy}
          >
            <div
              className={`transform transition-all duration-300 ${hasCheckIcon ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
            >
              <Copy className='h-5 w-5' />
            </div>
            <div
              className={`absolute inset-0 left-0 top-0 grid h-full w-full transform place-content-center transition-all duration-300 ${
                hasCheckIcon ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            >
              <Check className='h-5 w-5' />
            </div>
          </button>
        )}
        <a
          href={`/preview/${component?.componentName}`}
          target="_blank"
          rel="noopener noreferrer" 
          className='relative cursor-pointer place-content-center rounded-lg border bg-background p-2 px-2.5 hover:bg-accent hover:border-neutral-400 dark:hover:border-neutral-600 flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-md'
        >
          <span>Open New Tab</span>
          <ExternalLink className='h-5 w-5' />
        </a>
        {hasReTrigger && (
          <button
            className='relative grid group cursor-pointer place-content-center rounded-lg border bg-background p-2 px-2'
            onClick={handleReTrigger}
          >
            <RotateCw className='h-5 w-5 group-hover:rotate-180 transition-transform' />
          </button>
        )}
      </div>

      <div className="h-[600px] w-full rounded-lg dark:bg-[#080b11] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] overflow-hidden">
        {mode === 'desktop' ? (
          <div 
            className="w-full h-full"
            style={{
              aspectRatio: '1920/1080',
              transform: 'scale(var(--scale))',
              transformOrigin: 'top center',
              ['--scale' as string]: 'calc(min(1, min(600px / 1080, 100% / 1920)))',
              maxWidth: '1920px',
              margin: '0 auto',
              height: '1080px'
            }}
          >
            {MemoizedComponentPreview ? (
              <MemoizedComponentPreview key={reTriggerKey} />
            ) : (
              <div>Component not found</div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex justify-center">
            <div 
              className="h-full border-x border-border"
              style={{ width: width }}
            >
              {MemoizedComponentPreview ? (
                <MemoizedComponentPreview key={reTriggerKey} />
              ) : (
                <div>Component not found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
