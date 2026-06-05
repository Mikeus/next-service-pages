import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mb-4 mt-10 text-2xl font-bold text-slate-900">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 text-xl font-semibold text-slate-900">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-4 leading-7 text-slate-700">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-700">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-slate-700">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
  a: ({ href, children }) => (
    <a href={href} className="font-medium text-blue-600 underline-offset-2 hover:underline">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-blue-200 pl-4 italic text-slate-600">
      {children}
    </blockquote>
  ),
};

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={cn('max-w-none', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
