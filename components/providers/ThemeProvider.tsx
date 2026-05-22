'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="data-theme" 
      defaultTheme="research" 
      enableSystem={false}
      themes={['research', 'matrix', 'cyberpunk', 'vscode']}
    >
      {children}
    </NextThemesProvider>
  );
}
