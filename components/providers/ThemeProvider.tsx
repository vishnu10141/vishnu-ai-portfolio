'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="data-theme" 
      defaultTheme="green" 
      enableSystem={false}
      themes={['blue', 'green', 'purple', 'amber', 'red', 'cyan']}
    >
      {children}
    </NextThemesProvider>
  );
}
