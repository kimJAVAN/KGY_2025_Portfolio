// app/providers.tsx (Client Component)
'use client';

import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return children as-is for server rendering or initial client render
    // This prevents hydration mismatch when the theme is not yet determined
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}