import React from 'react';
import Header from '@/components/website/header';
import DocsSidebar from '@/components/website/sidebar';
import Footer from '@/components/website/footer';

export default async function ComponentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className='mx-auto pl-2 2xl:container lg:grid lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-4'>
        <DocsSidebar />
        <div className='min-w-0 max-w-full'>{children}</div>
      </main>
      <Footer />
    </>
  );
}

