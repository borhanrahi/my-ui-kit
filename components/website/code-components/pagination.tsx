import Link from 'next/link';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import docsData from '@/configs/docs.json' assert { type: 'json' };
import { generateSidebarData } from '../constant';

export function ComponentPagination({ doc }: any) {
  const sidebarData = generateSidebarData(docsData.dataArray);
  const pager = findPrevNextComp(sidebarData, doc.slug);
  // console.log(pager);
  // console.log(sidebarData);

  return (
    <div className='flex flex-row items-center justify-between mt-5 mb-2'>
      {pager?.prev?.id && (
        <Link
          href={pager.prev.id}
          className='group relative inline-flex no-underline h-12 items-center justify-center overflow-hidden rounded-md dark:bg-primary-foreground bg-gray-100   border px-3 font-medium dark:text-white text-black transition-all duration-200 hover:translate-x-[3px] translate-x-[0px] hover:translate-y-[-3px] translate-y-[0px] hover:[box-shadow:5px_5px_rgb(28_39_56)] dark:hover:[box-shadow:-5px_5px_rgb(229_231_235)]'
        >
          <ChevronsLeft className='mr-1 h-4 w-4' />
          {pager.prev.name}
        </Link>
      )}
      {pager?.next?.id && (
        <Link
          href={pager.next.id}
          className='group relative inline-flex h-12 no-underline items-center justify-center overflow-hidden rounded-md dark:bg-primary-foreground bg-gray-100   border px-3 font-medium dark:text-white text-black transition-all duration-200 hover:translate-x-[-3px] translate-x-[0px] hover:translate-y-[-3px] translate-y-[0px] hover:[box-shadow:5px_5px_rgb(28_39_56)] dark:hover:[box-shadow:5px_5px_rgb(229_231_235)] '
        >
          {pager.next.name}
          <ChevronsRight className='ml-1 h-4 w-4' />
        </Link>
      )}
    </div>
  );
}
export const findPrevNextComp = (dataArray: any[], slug: string) => {
  // Check if dataArray exists and is an array
  if (!Array.isArray(dataArray)) {
    return { prev: null, next: null };
  }

  // Filter out any group that doesn't have items array
  const validGroups = dataArray.filter(group => Array.isArray(group?.items));

  // Flatten the component arrays and generate the full path for matching
  const components = validGroups.flatMap((group) =>
    group.items.map((component: { href: any }) => ({
      id: `${component.href}`,
      ...component,
    }))
  );

  const currentIndex = components.findIndex(
    (component) => component.id === slug
  );

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? components[currentIndex - 1] : null;
  const next =
    currentIndex < components.length - 1 ? components[currentIndex + 1] : null;

  return { prev, next };
};
