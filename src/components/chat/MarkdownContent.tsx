import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownContentProps {
  content: string;
  isUser?: boolean;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({
  content,
  isUser = false,
}) => {
  return (
    <div className={`prose-sm max-w-none break-words ${isUser ? "text-black" : "text-slate-200"}`}>
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className={`font-semibold ${isUser ? "text-black" : "text-white"}`}>
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 my-2 space-y-1.5 marker:text-slate-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 my-2 space-y-1.5 marker:text-slate-400">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed pl-1">{children}</li>
          ),
          h1: ({ children }) => (
            <h1 className={`text-base font-bold my-2 ${isUser ? "text-black" : "text-white"}`}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className={`text-sm font-bold my-2 ${isUser ? "text-black" : "text-white"}`}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className={`text-xs font-bold uppercase tracking-wider my-1.5 ${isUser ? "text-black" : "text-[#00E5FF]"}`}>
              {children}
            </h3>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[#00E5FF]/50 pl-3 my-2 italic text-slate-300">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code
                className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                  isUser
                    ? "bg-black/15 text-black font-semibold"
                    : "bg-white/10 text-[#00E5FF] border border-white/10"
                }`}
              >
                {children}
              </code>
            ) : (
              <pre className="p-3 rounded-lg bg-[#050508] border border-white/10 overflow-x-auto my-2 text-xs font-mono text-emerald-400">
                <code>{children}</code>
              </pre>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline underline-offset-2 ${
                isUser ? "text-black hover:opacity-80" : "text-[#00E5FF] hover:text-[#33EEFF]"
              }`}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
