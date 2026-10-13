import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SortMind AI — Smart File & Desktop Organizer',
  description:
    'One AI. Every File. Zero Clutter. SortMind AI automatically organizes your laptop with local-first intelligence, natural-language search, duplicate detection, and safe recovery.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0b0f17" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('sortmind-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = (saved === 'light' || saved === 'dark') ? saved : (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
