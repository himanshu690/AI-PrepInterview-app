import React from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIResponsePreview = ({ content }) => {
  if (!content) return <p>No content available</p>;

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='text-[14px] prose prose-slate dark:prose-invert max-w-none'>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p({ children }) {
              return <p className='mb-4 leading-5'>{children}</p>
            },
            strong({ children }) {
              return <strong>{children}</strong>
            },
            em({ children }) {
              return <em>{children}</em>
            },
            ul({ children }) {
              return <ul className='list-disc pl-6 space-y-2 my-4'>{children}</ul>
            },
            ol({ children }) {
              return <ol className='list-decimal pl-6 space-y-2 my-4'>{children}</ol>
            },
            li({ children }) {
              return <li className='mb-1'>{children}</li>
            },
            blockquote({ children }) {
              return <blockquote className='border-l-4 border-gray-200 pl-4 italic my-4'>{children}</blockquote>
            },
            h1({ children }) {
              return <h1 className='text-2xl font-bold mt-6 mb-4'>{children}</h1>
            },
            h2({ children }) {
              return <h2 className='text-xl font-bold mt-6 mb-3'>{children}</h2>
            },
            h3({ children }) {
              return <h3 className='text-lg font-bold mt-5 mb-2'>{children}</h3>
            },
            h4({ children }) {
              return <h4 className='text-base font-bold mt-4 mb-2'>{children}</h4>
            },
            a({ children, href }) {
              return (
                <a
                  href={href}
                  className='text-blue-600 hover:underline'
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              )
            },
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneLight}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-gray-100 px-1 py-0.5 rounded">
                  {children}
                </code>
              );
            },
            table({ children }) {
              return (
                <div className='overflow-x-auto my-4'>
                  <table className='min-w-full divide-y divide-gray-300 border border-gray-200'>
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className='bg-gray-50'>{children}</thead>
            },
            tbody({ children }) {
              return <tbody>{children}</tbody>
            },
            tr({ children }) {
              return <tr>{children}</tr>
            },
            th({ children }) {
              return <th className='px-3 py-2 text-left font-semibold'>{children}</th>
            },
            td({ children }) {
              return <td className='px-3 py-2'>{children}</td>
            },
            hr() {
              return <hr className='my-4' />
            },
            img({ src, alt }) {
              return <img src={src} alt={alt || "image"} className='max-w-full h-auto' />
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default AIResponsePreview;