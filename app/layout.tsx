import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { FloatingWidgets } from "@/components/shared/FloatingWidgets";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AI Research Portfolio",
    template: "%s | AI Research Portfolio",
  },
  description:
    "Personal AI research portfolio — showcasing projects, papers, and experiments at the intersection of machine learning and real-world impact.",
  keywords: ["AI", "Machine Learning", "Research", "Deep Learning", "Portfolio"],
  authors: [{ name: "Researcher" }],
  creator: "Researcher",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "AI Research Portfolio",
    description: "Personal AI research portfolio",
    siteName: "AI Research Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Research Portfolio",
    description: "Personal AI research portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>
            <CommandPalette />
            <FloatingWidgets />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
