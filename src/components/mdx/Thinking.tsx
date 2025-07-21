/******************************************************************************
Copyright (c) Likhon Sheikh - @likhonsheikh on Telegram

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
import React from 'react';

interface ThinkingProps {
  children: React.ReactNode;
}

const Thinking: React.FC<ThinkingProps> = ({ children }) => {
  return (
    <div className="thinking-container" style={{ 
      backgroundColor: '#f0f0f0', 
      borderLeft: '4px solid #ccc', 
      padding: '10px 15px', 
      margin: '15px 0',
      fontStyle: 'italic',
      color: '#555'
    }}>
      {children}
    </div>
  );
};

export default Thinking;
