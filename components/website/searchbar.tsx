'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { DialogProps } from '@radix-ui/react-dialog';
import {
  CircleIcon,
  LaptopIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from 'lucide-react';
import { Command } from 'cmdk';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Dialog, DialogContent, DialogTitle } from '@/components/website/ui/dialog';
import { ScrollArea } from '@/components/website/ui//scroll-area';
import { generateSidebarData } from './constant';
import docsData from '@/configs/docs.json' assert { type: 'json' };
import { cn } from '@/lib/utils';
import { basePath } from './sidebar';
import { MainComponents, SpecialComponents } from '@/configs/docs';

export function SearchDialog({ classname }: { classname?: string }) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const searchbardata = [...basePath, ...SpecialComponents, ...MainComponents];

  const [searchOpen, setSearchOpen] = React.useState(false);
  
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setSearchOpen((searchOpen) => !searchOpen);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setSearchOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        className={cn(
          'relative inline-flex w-full items-center justify-start gap-2 whitespace-nowrap rounded-[0.5rem] border border-neutral-200 dark:border-neutral-800 bg-white px-4 py-2 text-sm font-normal text-neutral-600 dark:text-neutral-400 shadow-none transition-colors hover:border-neutral-900 dark:hover:border-neutral-100 hover:text-neutral-900 dark:hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:pointer-events-none disabled:opacity-50 dark:bg-black sm:pr-12',
          classname
        )}
        onClick={() => setSearchOpen(true)}
      >
        <SearchIcon />
        <span className='hidden lg:inline-flex'>Search...</span>
        <span className='inline-flex lg:hidden'>Search...</span>
        <kbd className='pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-7 select-none items-center gap-1 rounded border bg-neutral-100 dark:bg-neutral-800 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </button>

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className='w-[90%] rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent backdrop-blur-xl p-0 lg:w-[500px] xl:w-[800px]'>
          <VisuallyHidden asChild>
            <DialogTitle>Search</DialogTitle>
          </VisuallyHidden>
          <Command className='bg-transparent [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>
            <Command.Input
              placeholder='Type a command or search...'
              className='w-full rounded-tl-lg rounded-tr-lg border-b border-neutral-200 dark:border-neutral-800 px-4 outline-none bg-transparent'
            />

            <Command.List className='border-none bg-transparent'>
              <ScrollArea className='h-[300px]'>
                <Command.Empty>No results found.</Command.Empty>
                <Command.Group className='py-2'>
                  <span className='block p-2 text-xs font-semibold'>
                    Follow for more updates
                  </span>
                  <a
                    href='https://x.com/borhan_rahi'
                    target='_blank'
                    className='flex w-full items-center gap-2 rounded-md bg-blue-500/20 p-3'
                  >
                    <svg
                      width='120'
                      height='109'
                      viewBox='0 0 120 109'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-4 fill-black dark:fill-white'
                    >
                      <path d='M94.5068 0H112.907L72.7076 46.172L120 109H82.9692L53.9674 70.8942L20.7818 109H2.3693L45.3666 59.6147L0 0H37.9685L64.1848 34.8292L94.5068 0ZM88.0484 97.9318H98.2448L32.4288 10.4872H21.4882L88.0484 97.9318Z' />
                    </svg>
                    @borhan_rahi
                  </a>
                  <span className='block p-2 text-xs font-semibold'>
                    Getting Started
                  </span>
                </Command.Group>
                <Command.Group>
                  {searchbardata.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                      <Command.Item
                        className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-neutral-100 dark:hover:bg-neutral-800 aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 aria-selected:text-neutral-900 dark:aria-selected:text-neutral-100 data-[disabled]:opacity-75'
                        value={category.href}
                        onSelect={() => {
                          runCommand(() => router.push(category.href as string));
                        }}
                      >
                        <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                          <CircleIcon className='h-3 w-3' />
                        </div>
                        {category.name}
                      </Command.Item>
                    </React.Fragment>
                  ))}
                </Command.Group>
                <Command.Separator className='h-px bg-neutral-200 dark:bg-neutral-800' />
                <Command.Group className='rounded-xl py-2 bg-transparent'>
                  <span className='block p-1 py-2'>Theme</span>
                  {[
                    { icon: SunIcon, label: 'Light', theme: 'light' },
                    { icon: MoonIcon, label: 'Dark', theme: 'dark' },
                    { icon: LaptopIcon, label: 'System', theme: 'system' },
                  ].map(({ icon: Icon, label, theme }) => (
                    <Command.Item
                      key={theme}
                      className='relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-neutral-100 dark:hover:bg-neutral-800 aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 aria-selected:text-neutral-900 dark:aria-selected:text-neutral-100'
                      onSelect={() => runCommand(() => setTheme(theme))}
                    >
                      <Icon className='mr-2 h-4 w-4' />
                      {label}
                    </Command.Item>
                  ))}
                </Command.Group>
              </ScrollArea>
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
