import { ThemeProvider } from "next-themes";

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen w-full bg-background antialiased">
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}