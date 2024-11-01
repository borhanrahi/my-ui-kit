import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t pb-24 pt-4 xl:pb-4 fixed bottom-0 w-full bg-background z-[2]">
      <div className="container mx-auto px-4">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Contact Me at{' '}
          <Link
            href="https://x.com/borhan_rahi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            Twitter/X
          </Link>{' '}
          Find my works on{' '}
          <Link
            href="https://github.com/borhanrahi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}