'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { ArchitectureDiagram } from './ArchitectureDiagram';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert prose-blue max-w-none">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');

            if (!inline && match && match[1] === 'diagram') {
              return <ArchitectureDiagram type={String(children).replace(/\n$/, '')} />;
            }

            return !inline && match ? (
              <div className="rounded-xl overflow-hidden my-6 border border-white/10">
                <SyntaxHighlighter
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ margin: 0, padding: '1.5rem', background: '#020817' }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 text-sm" {...props}>
                {children}
              </code>
            );
          },
          h1: ({ children }) => <h1 className="text-3xl font-bold text-white mt-10 mb-6">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-semibold text-white mt-8 mb-4 pb-2 border-b border-white/10">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-medium text-white mt-6 mb-3">{children}</h3>,
          p: ({ children }) => <p className="text-slate-300 leading-relaxed mb-4">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6 ml-4 marker:text-blue-500">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside text-slate-300 space-y-2 mb-6 ml-4 marker:text-blue-500">{children}</ol>,
          a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-500/30 hover:decoration-blue-400 transition-colors">{children}</a>,
          strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
          blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 py-1 my-6 italic text-slate-400 bg-blue-500/5 rounded-r-lg">{children}</blockquote>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
