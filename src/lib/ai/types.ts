import { ReactNode } from 'react';

export type ServerMessage = {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  id: string;
  createdAt?: Date;
};

export type ClientMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  display: ReactNode;
};
