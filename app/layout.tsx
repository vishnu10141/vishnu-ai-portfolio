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
    default: "AI Engineer Portfolio",
    template: "%s | AI Engineer Portfolio",
  },
  description:
    "Personal AI engineer portfolio — showcasing practical engineering projects, machine learning models, and real-world deployed systems.",
  keywords: ["AI Engineer", "Machine Learning", "Deep Learning", "Software Engineering", "Portfolio"],
  authors: [{ name: "NIMMAKAYALA VISHNU" }],
  creator: "NIMMAKAYALA VISHNU",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "AI Engineer Portfolio",
    description: "Personal AI engineer portfolio",
    siteName: "AI Engineer Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Engineer Portfolio",
    description: "Personal AI engineer portfolio",
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
