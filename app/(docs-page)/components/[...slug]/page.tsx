import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getDocBySlug, getAllDocs } from '@/lib/docs';
import { cn } from '@/lib/utils';
import { Component } from 'lucide-react';
import { ComponentPagination } from '@/components/website/code-components/pagination';
import { CodeErrorBoundary } from '@/components/website/code-components/error-boundary';

export async function generateStaticParams() {
  const docs = await getAllDocs();
  console.log(docs);

  return docs.map((doc) => ({
    slug: doc.slug === 'index' ? [] : doc.slug.split('/'),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug?.join('/') || '';
  
  const doc = await getDocBySlug(slugPath);
  if (!doc) {
    return {};
  }

  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join('/') || '';
  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const { default: Content } = doc.content;

  return (
    <>
      <div className='container mx-auto mt-14'>
        <div className='flex w-full lg:gap-3'>
          <section className='prose w-full prose-zinc min-w-0 max-w-full pb-14  pt-4 dark:prose-invert prose-h1:text-2xl prose-h1:font-semibold prose-h2:text-2xl prose-h2:my-4  prose-h2:py-1  prose-h2:border-b prose-h3:py-1  prose-h2:mt-3 prose-h2:font-medium prose-h3:text-2xl prose-h3:mt-4 prose-h3:mb-2 prose-h3:font-medium prose-strong:font-medium prose-table:block prose-table:overflow-y-auto lg:pt-4'>
            <article className='mb-4 mt-0 rounded-lg bg-primary-foreground dark:border-none border p-6'>
              <div className='space-y-2 rounded-md dark:text-white text-black'>
                <h1
                  className={cn(
                    'mb-0 flex scroll-m-20  not-prose items-center text-3xl gap-2 font-medium tracking-tight'
                  )}
                >
                  <div className='w-10 h-10 bg-primary grid place-content-center text-primary-foreground rounded-lg'>
                    <Component />
                  </div>
                  {doc.content.metadata.title}
                </h1>
                <p className='text-sm'>{doc.content.metadata.description}</p>
              </div>
            </article>
            <CodeErrorBoundary>
              <Content />
            </CodeErrorBoundary>
            <ComponentPagination doc={doc} />
          </section>
        </div>
      </div>
    </>
  );
}
