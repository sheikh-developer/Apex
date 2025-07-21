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
