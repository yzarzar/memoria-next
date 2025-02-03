'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { CalendarDays, Heart, MessageCircle, Share2, ChevronDown, ChevronUp } from 'lucide-react'
import { events } from './data'
import { formatDateTime, formatNumber } from '@/lib/utils'
import { MediaGallery } from '@/components/MediaGallery'
import { motion, AnimatePresence } from 'framer-motion'
import { ShareMenu } from '@/components/ShareMenu'
import { EventDescription } from '@/components/EventDescription'
import { LocationPreview } from '@/components/LocationPreview'

export default function Event() {
  return (
    <main className="min-h-screen bg-zinc-50 bg-grid-black/[0.02] relative">
      <div className="max-w-5xl mx-auto p-6 space-y-16">
        {events.map((event) => (
          <article key={event.id} className="border-b border-zinc-200 pb-16 last:border-none">
            <h1 className="text-4xl font-bold text-zinc-900 mb-2">
              {event.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-zinc-500 mb-6">
              <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-2" />
                <span>{formatDateTime(event.date)}</span>
              </div>
              <LocationPreview 
                name={event.location.name}
                address={event.location.address}
                coordinates={event.location.coordinates}
                mapEmbedUrl={event.location.mapEmbedUrl}
              />
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
              <EventDescription text={event.description} maxLength={280} />
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
