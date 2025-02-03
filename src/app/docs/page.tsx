'use client'

import { DocumentPage, EventDescription } from '@/components/EventDescription'

export default function DocumentationPage() {
  const documentationContent = `
# Rich Text Documentation

## Basic Formatting

You can use various formatting options in your descriptions:

### Text Styling
- Use **bold text** by wrapping words in double asterisks: \`**bold text**\`
- Use *italic text* by wrapping words in single asterisks: \`*italic text*\`
- Use \`inline code\` by wrapping text in backticks: \`\`\`inline code\`\`\`

### Links
Create links using this format: [Link text](https://example.com)
Example: [Visit our website →](https://example.com)

### Lists

Unordered lists:
- Use hyphen for bullet points
- Like this example
- Each item on a new line

Numbered lists:
1. Start with number and dot
2. Automatically numbered
3. Easy to maintain

### Headers
Use hashtags for headers:
- \`# Main Title\` (H1)
- \`## Section Title\` (H2)
- \`### Subsection\` (H3)

### Code Blocks
Use \`backticks\` for inline code:
\`const example = "code"\`

### Blockquotes
> Use > symbol for blockquotes
> Great for highlighting important information

## Examples

Here's a complete example:

### Event Description Example

## About The Event
Join us for an exciting *tech conference* featuring **industry experts**!

### Key Highlights
- Live \`code\` demonstrations
- Interactive workshops
- Networking opportunities

### Schedule
1. Opening Keynote
2. Technical Sessions
3. Closing Remarks

> Early bird tickets available now!

[Register here →](https://example.com/register)

## Tips
- Keep formatting consistent
- Use headers to organize content
- Include relevant links
- Highlight important information
- Break text into readable sections`

  return (
    <main className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow-sm border border-zinc-200">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-zinc-900 mb-8">Documentation</h1>
            <div className="prose prose-zinc max-w-none">
              <div className="text-zinc-600">
                <EventDescription 
                  text={documentationContent}
                  maxLength={99999}
                  className="text-base leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 