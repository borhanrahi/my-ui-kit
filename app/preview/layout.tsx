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
      <div className="min-h-screen">
        {children}
      </div>
    </ThemeProvider>
  );
}