'use client';

import { useChat } from '@ai-sdk/react';

export default function ChatInput() {
  const { error, status, sendMessage, messages, regenerate, stop } = useChat({
    api: '/api/chat-google', // Configure the API endpoint
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <h1 className="mb-4 text-xl font-bold">
        Google Block-Based Streaming Test
      </h1>

      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.parts.map(part => {
            if (part.type === 'text') {
              return part.text;
            }
          })}
        </div>
      ))}

      {(status === 'submitted' || status === 'streaming') && (
        <div className="mt-4 text-gray-500">
          {status === 'submitted' && <div>Loading...</div>}
          <button
            type="button"
            className="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md"
            onClick={stop}
          >
            Stop
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4">
          <div className="text-red-500">An error occurred.</div>
          <button
            type="button"
            className="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md"
            onClick={() => regenerate()}
          >
            Retry
          </button>
        </div>
      )}

      {/* This is the actual input form for sending messages */}
      <form onSubmit={e => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const text = formData.get('message') as string;
        sendMessage({ text });
        form.reset(); // Clear the input after sending
      }}>
        <input
          type="text"
          name="message"
          placeholder="Say something..."
          className="w-full p-2 border border-gray-300 rounded-md"
          disabled={status === 'submitted' || status === 'streaming'}
        />
        <button
          type="submit"
          className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md"
          disabled={status === 'submitted' || status === 'streaming'}
        >
          Send
        </button>
      </form>
    </div>
  );
}