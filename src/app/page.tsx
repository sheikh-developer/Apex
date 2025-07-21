/******************************************************************************
Copyright (c) Likhon Sheikh - @likhonsheikh on Telegram

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
'use client';

import { useState, ChangeEvent } from 'react';
import { AI, UIState } from './ai';
import { useActions, useUIState } from '@ai-sdk/rsc';
import { Page as GeistPage, Text, Input, Button } from '@geist-ui/core';
import { Header } from '../components/Header';
import { ClientMessage } from '../lib/ai/types';

function Chat() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add user message
    setMessages((currentMessages: ClientMessage[]) => [
      ...currentMessages,
      {
        id: Date.now().toString(),
        role: 'user',
        display: <Text>{input}</Text>
      }
    ]);

    const response = await submitUserMessage(input);
    setInput('');

    // Add assistant response
    setMessages((currentMessages: ClientMessage[]) => [
      ...currentMessages,
      response
    ]);
  };

  return (
    <GeistPage>
      <Header />
      <GeistPage.Content>
        <div>
          {messages.map((message: ClientMessage) => (
            <div key={message.id}>{message.display}</div>
          ))}
        </div>
      </GeistPage.Content>
      <GeistPage.Footer>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Input
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            placeholder="Send a message..."
            width="100%"
          />
          <Button auto htmlType="submit" type="secondary">Send</Button>
        </form>
      </GeistPage.Footer>
    </GeistPage>
  );
}

export default function Page() {
  return (
    <Chat />
  );
}
