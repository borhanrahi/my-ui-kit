import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 pb-24 pt-4 xl:pb-4 relative bottom-0 w-full bg-white dark:bg-[#020817]">
      <div className="container mx-auto px-4">
        <p className="text-balance text-center text-sm leading-loose text-neutral-600 dark:text-neutral-400 md:text-left">
          Contact Me at{' '}
          <Link
            href="https://x.com/borhan_rahi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors"
          >
            Twitter/X
          </Link>{' '}
          Find my works on{' '}
          <Link
            href="https://github.com/borhanrahi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}