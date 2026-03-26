"use client"

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface EdIntelMarkdownProps {
  content: string;
}

const EdIntelMarkdown: React.FC<EdIntelMarkdownProps> = ({ content }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
};

export default React.memo(EdIntelMarkdown, (prev, next) => prev.content === next.content);
