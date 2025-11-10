import React from 'react';

interface MarkdownRendererProps {
  text: string;
}

const parseInlineMarkdown = (line: string) => {
  // Handles **bold** text
  const parts = line.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ text }) => {
  // Pre-process the text to normalize different list formats.
  // This specifically targets lists that are not on new lines (e.g., "text: * item1 * item2")
  // and converts them into a consistent format with newlines.
  const processedText = text.replace(/\s\*\s/g, '\n* ');

  const lines = processedText.split('\n');

  return (
    <>
      {lines.map((line, index) => {
        const trimmedLine = line.trim();

        // Render list items
        if (trimmedLine.startsWith('* ')) {
          return (
            <div key={index} className="flex items-start pl-1">
              <span className="mr-2 mt-1 text-cyan-400">•</span>
              <span>{parseInlineMarkdown(trimmedLine.substring(2))}</span>
            </div>
          );
        }

        // Render paragraphs (and ignore empty lines)
        if (trimmedLine) {
          return (
            <p key={index} className="mb-2 last:mb-0">
              {parseInlineMarkdown(trimmedLine)}
            </p>
          );
        }

        return null;
      })}
    </>
  );
};

export default MarkdownRenderer;
