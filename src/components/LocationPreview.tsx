'use client'

import { useState, useEffect } from 'react'
import { MapPin, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { HTMLAttributeReferrerPolicy } from 'react'

interface LocationPreviewProps {
  name: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  mapEmbedUrl: string
}

function extractMapAttributes(iframeHtml: string) {
  if (typeof window === 'undefined') return null
  
  const parser = new DOMParser()
  const doc = parser.parseFromString(iframeHtml, 'text/html')
  const iframe = doc.querySelector('iframe')
  
  if (!iframe) return null

  return {
    src: iframe.getAttribute('src') || '',
    allowFullscreen: iframe.hasAttribute('allowfullscreen'),
    loading: (iframe.getAttribute('loading') || 'lazy') as 'lazy' | 'eager',
    referrerPolicy: (iframe.getAttribute('referrerpolicy') || 'no-referrer-when-downgrade') as HTMLAttributeReferrerPolicy
  }
}

export function LocationPreview({ name, address, coordinates, mapEmbedUrl }: LocationPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mapAttributes, setMapAttributes] = useState<ReturnType<typeof extractMapAttributes>>(null)
  const directionsUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`

  useEffect(() => {
    setMapAttributes(extractMapAttributes(mapEmbedUrl))
  }, [mapEmbedUrl])

  return (
    <div 
      className="relative inline-flex items-center gap-2 text-zinc-600 hover:text-purple-600 transition-colors group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MapPin className="w-5 h-5" />
      <span className="text-sm">{name}</span>
      
      <AnimatePresence>
        {isHovered && mapAttributes && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-[400px] p-4 bg-white rounded-xl shadow-lg border border-zinc-200 z-10"
          >
            <div className="text-base font-medium text-zinc-900 mb-2">{name}</div>
            <div className="text-sm text-zinc-600 mb-4">{address}</div>
            
            <a 
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-[250px] rounded-lg overflow-hidden bg-zinc-100 block relative group/map hover:shadow-md transition-shadow"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/map:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-medium flex items-center gap-1">
                  Open in Google Maps
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
              <iframe
                src={mapAttributes.src}
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading={mapAttributes.loading}
                allowFullScreen={mapAttributes.allowFullscreen}
                referrerPolicy={mapAttributes.referrerPolicy}
                className="grayscale opacity-90 group-hover/map:grayscale-0 group-hover/map:opacity-100 transition duration-300"
              />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 