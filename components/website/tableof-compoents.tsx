'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}

interface TableOfContentsProps {
  toc: Promise<{ items: TocItem[] }>;
}
const matchPath = [
  '/docs/get-started',
  '/docs/components',
  '/docs/templates',
  '/docs/introduction',
  // '/docs/components/buttons',
];
export default function TableOfContents({ toc }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const pathname = usePathname();

  // Resolving the TOC promise and setting the toc items
  useEffect(() => {
    console.log(toc);

    toc.then((resolvedToc) => {
      setTocItems(resolvedToc.items);
    });
  }, [toc]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    const headers = document.querySelectorAll('h2, h3');
    headers.forEach((header) => observer.observe(header));

    return () => {
      headers.forEach((header) => observer.unobserve(header));
    };
  }, []);
  const checkpath = matchPath.find((path) => path === pathname);
  if (checkpath) {
    return;
  }
  // console.log('tocitems', tocItems);

  return (
    <>
      {tocItems?.length !== 0 && (
        <aside className='hidden lg:block bg-primary-foreground w-[170px] shrink-0 border-x'>
          <div className='sticky top-16 p-2'>
            <div>
              <span className='text-sm px-1 text-primary font-semibold pb-1 inline-block'>
                On This Page
              </span>
              <hr />
              <ul className='list-none m-0 ml-0 text-[0.8em] space-y-0.5 pt-2 pl-0'>
                {tocItems?.map((item) => (
                  <li key={item.url || item.title} className="hover:text-primary">
                    <Link href={`#${item.url}`}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
