import { type ReactNode } from 'react';
import { AI } from './ai';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI SDK 5 Beta',
  description: 'The AI SDK 5 Beta is intended for new projects, trying out new features, and experimenting with migrations from v4.',
  manifest: '/manifest.json',
  icons: {
    icon: '/apex.png',
  },
  openGraph: {
    title: 'AI SDK 5 Beta',
    description: 'The AI SDK 5 Beta is intended for new projects, trying out new features, and experimenting with migrations from v4.',
    images: [{ url: '/apex.png' }],
    url: 'https://sdk.vercel.ai/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI SDK 5 Beta',
    description: 'The AI SDK 5 Beta is intended for new projects, trying out new features, and experimenting with migrations from v4.',
    images: ['/apex.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AI>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AI>
  );
}
