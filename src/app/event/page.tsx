'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { CalendarDays, Heart, MessageCircle, Share2, ChevronDown, ChevronUp } from 'lucide-react'
import { events } from './data'
import { formatDateTime, formatNumber } from '@/lib/utils'
import { MediaGallery } from '@/components/MediaGallery'
import { motion, AnimatePresence } from 'framer-motion'
import { ShareMenu } from '@/components/ShareMenu'

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
}

function ExpandableText({ text, maxLength = 200 }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shouldShowButton = text.length > maxLength
  const displayText = !isExpanded && shouldShowButton ? text.slice(0, maxLength) + '...' : text

  return (
    <div className="space-y-2">
      <motion.div
        initial={false}
        animate={{ height: 'auto' }}
        className="overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={isExpanded ? 'expanded' : 'collapsed'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="text-zinc-700 text-lg leading-relaxed"
          >
            {displayText}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {shouldShowButton && (
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      )}
    </div>
  )
}

export default function Event() {
  return (
    <main className="min-h-screen bg-zinc-50 bg-grid-black/[0.02] relative">
      <div className="max-w-5xl mx-auto p-6 space-y-16">
        {events.map((event) => (
          <article key={event.id} className="border-b border-zinc-200 pb-16 last:border-none">
            <h1 className="text-4xl font-bold text-zinc-900 mb-2">
              {event.title}
            </h1>
            <div className="flex items-center text-zinc-500 mb-6">
              <CalendarDays className="w-4 h-4 mr-2" />
              <span>{formatDateTime(event.date)}</span>
            </div>

            <MediaGallery media={event.media} />

            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-100">
                <Image
                  src={event.author.avatar}
                  alt={event.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-zinc-900 font-medium">{event.author.name}</h3>
                <p className="text-zinc-500 text-sm">{event.author.email}</p>
              </div>
            </div>

            <div className="prose max-w-none">
              <ExpandableText text={event.description} maxLength={200} />
            </div>

            <div className="flex gap-4 mt-8">
              <button className="flex items-center gap-2 bg-white hover:bg-purple-50 px-6 py-3 rounded-xl transition duration-200 border border-zinc-200 shadow-sm">
                <Heart className="w-5 h-5 text-purple-500" />
                <span className="text-zinc-700 font-medium">{formatNumber(event.engagement.likes)}</span>
              </button>
              <button className="flex items-center gap-2 bg-white hover:bg-purple-50 px-6 py-3 rounded-xl transition duration-200 border border-zinc-200 shadow-sm">
                <MessageCircle className="w-5 h-5 text-purple-500" />
                <span className="text-zinc-700 font-medium">{formatNumber(event.engagement.comments)}</span>
              </button>
              <ShareMenu 
                url={`https://yourdomain.com/event/${event.id}`} 
                title={event.title}
              />
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
