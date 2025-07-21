import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface MathBlockProps {
  children: string;
  inline?: boolean;
}

const MathBlock: React.FC<MathBlockProps> = ({ children, inline = false }) => {
  if (inline) {
    return <InlineMath>{children}</InlineMath>;
  }
  return <BlockMath>{children}</BlockMath>;
};

export default MathBlock;
