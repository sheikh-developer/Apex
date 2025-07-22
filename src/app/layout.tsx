/******************************************************************************
Copyright (c) Likhon Sheikh - @likhonsheikh on Telegram

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
import { type ReactNode } from 'react';
import { Metadata } from 'next';
import { AppWrapper } from './app-wrapper';

export const metadata: Metadata = {
  title: 'Apex',
  description: 'Apex - AI-Powered Development Platform',
  manifest: '/manifest.json',
  icons: {
    icon: '/apex.png',
  },
  openGraph: {
    title: 'Apex',
    description: 'Apex - AI-Powered Development Platform',
    images: [{ url: '/apex.png' }],
    url: 'https://sdk.vercel.ai/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex',
    description: 'Apex - AI-Powered Development Platform',
    images: ['/apex.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
