import React from 'react';
import DOMPurify from 'dompurify';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';

SyntaxHighlighter.registerLanguage('python', python);

interface StructuredResponseProps {
  content: string;
}

export const StructuredResponse: React.FC<StructuredResponseProps> = ({ content }) => {
  const formatContent = (text: string) => {
    // Handle code blocks
    text = text.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
      return `<code-block language="${lang || 'text'}">${code.trim()}</code-block>`;
    });

    // Make headlines bold
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert "–" to bullet points
    formattedText = formattedText.replace(/^–\s/gm, '• ');
    
    // Convert ### to h1 headers
    formattedText = formattedText.replace(/^###\s*(.*?)$/gm, '<h1 class="text-2xl font-bold mb-2">$1</h1>');
    
    // Handle math expressions
    formattedText = formattedText.replace(/\$\$(.*?)\$\$/g, (match, p1) => `<math-block>${p1}</math-block>`);
    formattedText = formattedText.replace(/\$(.*?)\$/g, (match, p1) => `<math-inline>${p1}</math-inline>`);
    
    // Handle \boxed and other LaTeX commands outside of $ delimiters
    formattedText = formattedText.replace(/\\boxed\{([^}]+)\}/g, (match, p1) => `<math-inline>${p1}</math-inline>`);
    
    // Convert newlines to <br> tags
    formattedText = formattedText.replace(/\n/g, '<br/>');
    
    return formattedText;
  };

  const sanitizedContent = DOMPurify.sanitize(formatContent(content));

  const renderContent = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedContent, 'text/html');
    
    const renderNode = (node: Node): React.ReactNode => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }
      
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        
        if (element.tagName.toLowerCase() === 'math-inline') {
          return <InlineMath math={element.innerHTML} />;
        }
        
        if (element.tagName.toLowerCase() === 'math-block') {
          return <BlockMath math={element.innerHTML} />;
        }
        
        if (element.tagName.toLowerCase() === 'code-block') {
          const language = element.getAttribute('language') || 'text';
          return (
            <div className="my-4 rounded-lg overflow-hidden bg-gray-800 shadow-lg">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-700">
                <span className="text-sm font-semibold text-gray-200">
                  Code: {language.charAt(0).toUpperCase() + language.slice(1)}
                </span>
              </div>
              <div className="p-4 bg-gray-900">
                <SyntaxHighlighter 
                  language={language} 
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: 0,
                    background: 'transparent',
                  }}
                >
                  {element.textContent || ''}
                </SyntaxHighlighter>
              </div>
            </div>
          );
        }
        
        if (element.tagName.toLowerCase() === 'br') {
          return <br key={Math.random()} />;
        }
        
        const props: any = {};
        Array.from(element.attributes).forEach(attr => {
          props[attr.name] = attr.value;
        });
        
        return React.createElement(
          element.tagName.toLowerCase(),
          { ...props, key: Math.random() },
          Array.from(element.childNodes).map(renderNode)
        );
      }
      
      return null;
    };
    
    return Array.from(doc.body.childNodes).map(renderNode);
  };

  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-800">
      {renderContent()}
    </div>
  );
};