'use client';

import { useState } from 'react';
import { AI } from './ai';
import { useActions, useUIState } from '@ai-sdk/rsc';
import { ClientMessage } from '../lib/ai/types';

function Chat() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Add user message
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        role: 'user',
        display: <div>{input}</div>
      }
    ]);

    const response = await submitUserMessage(input);
    setInput('');
    
    // Add assistant response
    setMessages(currentMessages => [
      ...currentMessages,
      response
    ]);
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>{message.display}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default function Page() {
  return (
    <Chat />
  );
}
