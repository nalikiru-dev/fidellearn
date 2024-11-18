'use client';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface StructuredResponseProps {
  content: string | null;
}

export const StructuredResponse: React.FC<StructuredResponseProps> = ({ content }) => {
  if (!content) return null;

  // Split content into segments (code blocks and text)
  const segments = content.split(/(```[a-z]*\n[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-sm leading-normal">
      {segments.map((segment, index) => {
        // Check if this is a code block
        if (segment.startsWith('```')) {
          const language = segment.split('\n')[0].replace('```', '').trim();
          const code = segment
            .split('\n')
            .slice(1, -1)
            .join('\n')
            .trim();

          return (
            <div key={index} className="relative rounded-md bg-muted/50">
              <div className="absolute right-2 top-2 text-xs text-muted-foreground">
                {language || 'text'}
              </div>
              <SyntaxHighlighter
                language={language || 'text'}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: '6px',
                  background: 'transparent',
                  padding: '1.5rem',
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          );
        }

        // Process regular text
        const formattedText = segment
          // Bold text
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          // Bullet points
          .replace(/^[-*•]\s(.+)$/gm, '<li>$1</li>')
          // Headers
          .replace(/^### (.*?)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
          .replace(/^## (.*?)$/gm, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
          .replace(/^# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
          // Links
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
          // Line breaks
          .replace(/\n/g, '<br/>');

        return (
          <div
            key={index}
            className="prose prose-sm max-w-none prose-headings:mb-2 prose-headings:mt-4 prose-p:my-2 prose-li:my-0"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        );
      })}
    </div>
  );
};