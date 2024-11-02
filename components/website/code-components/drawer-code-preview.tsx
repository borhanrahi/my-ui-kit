import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/website/ui/tabs';
import docs from '@/configs/docs.json';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/website/ui/dialog';
import { Pre, RawCode, highlight } from 'codehike/code';

import {
  DrawerContent,
  ResponsiveDrawer,
} from '@/components/core/drawer/vaul-main';
import ComponentPreview from './component-preview';
import { extractCodeFromFilePath } from '@/lib/code';
import React from 'react';
import { Code, Eye, Maximize2 } from 'lucide-react';
import prettier from 'prettier';

import { CopyButton } from './copy-button';
import { ScrollArea } from '../ui/scroll-area';
import ComponentBlocks from './component-block';
import { callout, wordWrap } from '../constant';
import { cn } from '@/lib/utils';
import ts from 'typescript';

type ComponentCodePreview = {
  component: React.ReactElement;
  hasReTrigger?: boolean;
  name: string;
  children: React.ReactNode; //
  responsive?: boolean;
  isCard?: string;
};
export type TCurrComponentProps = {
  componentName: string;
  iframeSrc?: string;
  componentSrc?: React.LazyExoticComponent<React.FC<{}>>;
  filesrc?: string;
  compIframeSrc?: string;
  filesArray?: any;
};

export default async function DrawerCodePreview({
  hasReTrigger,
  name,
  children,
  isCard,
  responsive,
}: ComponentCodePreview) {
  // Find the component in docs.json
  const currComponent: TCurrComponentProps | null =
    docs.dataArray.reduce<TCurrComponentProps | null>((acc, component) => {
      const file = component?.componentArray?.find(
        (file) => file.componentName === name
      );

      if (file) {
        acc = file;
      }
      return acc;
    }, null);

  // Debugging: Check if the component is found
  console.log('Current Component:', currComponent);

  if (!currComponent) {
    return <div>Component not found</div>;
  }

  // Fetch the component code
  const fileContent = currComponent.filesrc 
    ? await extractCodeFromFilePath(currComponent.filesrc)
    : null;

  if (!fileContent) {
    return <div>No component code found</div>;
  }

  // Render the component preview
  return (
    <div className='not-prose relative z-0 flex items-center justify-between pb-3'>
      <ComponentPreview
        // hasReTrigger={hasReTrigger}
        component={currComponent}
        code={fileContent}
        // responsive={false}
        isNotCopy={true}
        // isFitheight={false}
      />
      <CopyButton code={fileContent} />
    </div>
  );
}
