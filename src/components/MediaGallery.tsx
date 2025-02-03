'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { MediaItem } from '@/app/event/data'
import { cn } from '@/lib/utils'

interface MediaGalleryProps {
  media: MediaItem[]
}

function getYouTubeVideoId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export function MediaGallery({ media }: MediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const goToNext = () => {
    setIsPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % media.length)
  }

  const goToPrevious = () => {
    setIsPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length)
  }

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-8 shadow-lg group">
      {/* Main Media Display */}
      {media[currentIndex].type === 'video' ? (
        <>
          {isPlaying ? (
            <div className="w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(media[currentIndex].url as string)}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <button 
              onClick={() => setIsPlaying(true)}
              className="relative block w-full h-full group/video"
            >
              <Image
                src={media[currentIndex].thumbnail!}
                alt="Video thumbnail"
                fill
                className="object-cover group-hover/video:opacity-75 transition-opacity"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover/video:bg-black/50 transition-colors">
                <div className="bg-white/25 p-6 rounded-full backdrop-blur-sm group-hover/video:scale-110 transition-transform">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
            </button>
          )}
        </>
      ) : (
        <Image
          src={media[currentIndex].url}
          alt="Event media"
          fill
          className="object-cover"
          priority={currentIndex === 0}
        />
      )}

      {/* Navigation Arrows */}
      {media.length > 1 && !isPlaying && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Thumbnail Navigation */}
      {media.length > 1 && !isPlaying && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsPlaying(false)
                setCurrentIndex(index)
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentIndex === index
                  ? "bg-white w-4"
                  : "bg-white/50 hover:bg-white/75"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
} 