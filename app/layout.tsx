import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Is the Potato Online? | Critical Infrastructure Monitoring',
  description: 'Real-time monitoring of the most important potato in the universe. Check if the potato is online with live status updates.',
  keywords: ['potato', 'online', 'status', 'monitoring', 'infrastructure', 'critical'],
  openGraph: {
    title: 'Is the Potato Online?',
    description: 'Critical potato infrastructure monitoring',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}