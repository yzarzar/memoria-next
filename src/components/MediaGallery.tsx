'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import { MediaItem } from '@/app/event/data'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [direction, setDirection] = useState(0)
  const [isFullView, setIsFullView] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const goToNext = () => {
    setIsPlaying(false)
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % media.length)
  }

  const goToPrevious = () => {
    setIsPlaying(false)
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length)
  }

  const handleExit = () => {
    setIsPlaying(false)
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsFullView(false)
      setIsPlaying(false)
      setIsClosing(false)
    }, 200)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { 
          type: "spring", 
          stiffness: 100,
          damping: 20,
          mass: 0.5
        },
        opacity: { 
          duration: 0.8,
          ease: "easeInOut"
        }
      }
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { 
          type: "spring", 
          stiffness: 150,
          damping: 22,
          mass: 0.5,
          restSpeed: 0.5
        },
        opacity: { 
          duration: 0.8,
          ease: "easeInOut"
        }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { 
          type: "spring", 
          stiffness: 100,
          damping: 20,
          mass: 0.5,
          restSpeed: 0.5
        },
        opacity: { 
          duration: 0.8,
          ease: "easeInOut"
        }
      }
    })
  }

  const gridToFullViewVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }

  const renderGridView = () => {
    const visibleMedia = media.slice(0, 3)
    const remainingCount = media.length - 3

    return (
      <div 
        className={cn(
          "grid gap-1 w-full h-[600px] rounded-2xl overflow-hidden",
          media.length === 1 && "grid-cols-1",
          media.length === 2 && "grid-cols-2",
          media.length >= 3 && "grid-cols-2 grid-rows-[1.5fr_1fr]"
        )}
      >
        {visibleMedia.map((item, index) => {
          const isLastItem = index === 2 && media.length > 3
          const isWide = media.length >= 3 && index === 0
          const shouldShowCount = isLastItem && item.type !== 'video'

          return (
            <div
              key={index}
              className={cn(
                "relative cursor-pointer",
                isWide && "col-span-2 row-span-1",
                media.length >= 3 && index > 0 && "row-span-1"
              )}
              onClick={() => {
                setCurrentIndex(index)
                setIsFullView(true)
              }}
            >
              {item.type === 'video' ? (
                <div className="relative w-full h-full group">
                  <Image
                    src={item.thumbnail!}
                    alt="Video thumbnail"
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/25 p-3 rounded-full">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  {isLastItem && (
                    <div className="absolute bottom-4 right-4 bg-black/50 px-2 py-1 rounded-md">
                      <span className="text-white text-sm font-medium">
                        +{remainingCount} more
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={item.url}
                    alt="Event media"
                    fill
                    className="object-cover hover:opacity-95 transition-opacity"
                  />
                  {shouldShowCount && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="text-white text-2xl font-medium">
                        +{remainingCount}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const renderFullView = () => {
    return (
      <motion.div
        initial="initial"
        animate={isClosing ? "exit" : "animate"}
        exit="exit"
        variants={gridToFullViewVariants}
        className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-lg group"
      >
        <motion.button
          onClick={handleClose}
          whileHover={{ 
            scale: 1.1,
            rotate: 90,
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
        >
          <X className="w-6 h-6" />
        </motion.button>

        <AnimatePresence 
          initial={false} 
          custom={direction} 
          mode="sync"
        >
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {media[currentIndex].type === 'video' ? (
              <>
                {isPlaying ? (
                  <div className="relative w-full h-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(media[currentIndex].url as string)}?autoplay=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    {/* Exit button for video */}
                    <button
                      onClick={handleExit}
                      className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
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
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Now visible even when video is playing */}
        {media.length > 1 && (
          <>
            <button
              onClick={() => {
                goToPrevious()
                handleExit()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => {
                goToNext()
                handleExit()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Thumbnail Navigation - Now visible even when video is playing */}
        {media.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsPlaying(false)
                  setDirection(index > currentIndex ? 1 : -1)
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
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {isFullView ? renderFullView() : renderGridView()}
    </AnimatePresence>
  )
} 