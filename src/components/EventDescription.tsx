'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ExternalLink, Code, Hash } from 'lucide-react'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface EventDescriptionProps {
  text: string
  maxLength?: number
  className?: string
}

export function EventDescription({ text, maxLength = 200, className }: EventDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldShowButton = text.length > maxLength
  const displayText = !isExpanded && shouldShowButton ? text.slice(0, maxLength) + '...' : text

  // Format text with advanced formatting
  const formatText = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      // Skip empty paragraphs but maintain spacing
      if (paragraph.trim() === '') {
        return <div key={index} className="h-4" />
      }

      // Handle bullet lists (now using a custom bullet style)
      if (paragraph.startsWith('- ')) {
        return (
          <ul key={index} className="list-none space-y-2 my-4">
            {paragraph.split('- ').filter(Boolean).map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                </div>
                <span className="flex-1">
                  {formatInline(item.trim())}
                </span>
              </li>
            ))}
          </ul>
        )
      }

      // Handle numbered lists
      if (/^\d+\.\s/.test(paragraph)) {
        // Split the paragraph into lines and filter out empty ones
        const items = paragraph
          .split('\n')
          .filter(line => /^\d+\.\s/.test(line))
          .map(line => {
            const [number, ...rest] = line.split('. ')
            return {
              number: parseInt(number),
              text: rest.join('. ').trim()
            }
          })

        return (
          <ol key={index} className="list-none space-y-2 my-4">
            {items.map((item) => (
              <li key={item.number} className="flex items-start gap-2">
                <span className="text-purple-500 font-medium min-w-[1.5rem]">
                  {item.number}.
                </span>
                <span className="flex-1">
                  {formatInline(item.text)}
                </span>
              </li>
            ))}
          </ol>
        )
      }

      // Handle headings
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-4">
            {formatInline(paragraph.replace('## ', ''))}
          </h2>
        )
      }

      // Regular paragraph
      return (
        <p key={index} className="mb-4 last:mb-0">
          {formatInline(paragraph)}
        </p>
      )
    })
  }

  // Format inline elements (bold, links, code)
  const formatInline = (text: string) => {
    // First, handle links with a more precise regex
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText) => {
      // Return only the link text part
      return `[${linkText}]`
    })
    
    const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]|`[^`]+`|\*[^*]+\*)/)
    
    return parts.map((part, i) => {
      // Bold text
      if (part?.startsWith('**') && part?.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-zinc-900 dark:text-zinc-100">
            {part.slice(2, -2)}
          </strong>
        )
      }
      
      // Links (now just handle the text part)
      if (part?.startsWith('[') && part?.endsWith(']')) {
        const linkText = part.slice(1, -1)
        return (
          <a
            key={i}
            href="#"
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 inline-flex items-center gap-1 group font-medium"
          >
            {linkText}
            <ExternalLink 
              className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" 
              style={{ marginLeft: linkText.endsWith('→') ? '-1px' : '2px' }}
            />
          </a>
        )
      }

      // Inline code
      if (part?.startsWith('`') && part?.endsWith('`')) {
        return (
          <code key={i} className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm font-mono text-purple-600 dark:text-purple-400 inline-flex items-center gap-1">
            <Code className="w-3 h-3 opacity-50" />
            {part.slice(1, -1)}
          </code>
        )
      }

      // Highlighted text
      if (part?.startsWith('*') && part?.endsWith('*')) {
        return (
          <span key={i} className="font-medium text-purple-600 dark:text-purple-400">
            {part.slice(1, -1)}
          </span>
        )
      }

      return part
    })
  }

  return (
    <div className={cn("space-y-2", className)}>
      <motion.div
        initial={false}
        animate={{ height: 'auto' }}
        className="overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isExpanded ? 'expanded' : 'collapsed'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="prose prose-zinc dark:prose-invert max-w-none"
          >
            <div className="text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed">
              {formatText(displayText)}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {shouldShowButton && (
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="bg-purple-50 dark:bg-purple-900/20 rounded-full p-1"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      )}
    </div>
  )
}

interface DocumentPageProps {
  title?: string
  content: string
  maxLength?: number
  className?: string
}

export function DocumentPage({ title, content, maxLength = 280, className }: DocumentPageProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldTruncate = content.length > maxLength

  return (
    <div className={cn("prose prose-zinc max-w-none", className)}>
      {title && (
        <h1 className="text-2xl font-bold text-zinc-900 mb-6">{title}</h1>
      )}
      
      <div className={cn(
        "prose-headings:font-semibold prose-headings:text-zinc-900",
        "prose-p:text-zinc-600 prose-p:leading-relaxed",
        "prose-strong:font-semibold prose-strong:text-zinc-900",
        "prose-code:text-purple-600 prose-code:bg-purple-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm",
        "prose-ul:text-zinc-600 prose-li:text-zinc-600",
        "prose-a:text-purple-600 prose-a:no-underline hover:prose-a:text-purple-700",
      )}>
        <AnimatePresence initial={false}>
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : shouldTruncate ? '280px' : 'auto' }}
            className="relative overflow-hidden"
          >
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="text-2xl mt-8 first:mt-0">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl mt-8">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg mt-6">{children}</h3>,
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                    {children}
                  </a>
                ),
                code: ({ children }) => <code className="font-mono">{children}</code>,
                ul: ({ children }) => <ul className="list-disc pl-4 space-y-2 mt-4">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 space-y-2 mt-4">{children}</ol>,
                li: ({ children }) => <li className="pl-2">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-purple-200 pl-4 italic text-zinc-600">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {content}
            </ReactMarkdown>

            {shouldTruncate && !isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
            )}
          </motion.div>
        </AnimatePresence>

        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 font-medium mt-4"
          >
            {isExpanded ? (
              <>
                Show less
                <ChevronDown className="w-4 h-4" />
              </>
            ) : (
              <>
                Read more
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
} 