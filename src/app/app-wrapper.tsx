'use client';

import { ReactNode } from 'react';
import { AI } from './ai';
import { Providers } from './providers';

export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <AI>
      <Providers>{children}</Providers>
    </AI>
  );
}