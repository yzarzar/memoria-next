'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Share2, Twitter, Facebook, Link2, Mail, Check,
  MessageSquare
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { 
  SiDiscord, 
  SiTelegram, 
  SiWechat, 
  SiLine, 
  SiPinterest,
  SiReddit,
  SiSinaweibo,
  SiWhatsapp
} from 'react-icons/si'
import { LiaTelegram } from "react-icons/lia";
import { AiOutlineLinkedin } from "react-icons/ai";

interface ShareMenuProps {
  url: string
  title: string
}

export function ShareMenu({ url, title }: ShareMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Reset copied state when menu closes
  useEffect(() => {
    if (!isOpen) {
      setIsCopied(false)
    }
  }, [isOpen])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: SiWhatsapp,
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      color: 'hover:bg-[#25D366] hover:text-white',
    },
    {
      name: 'Telegram',
      icon: LiaTelegram,
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'hover:bg-[#0088cc] hover:text-white',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#1DA1F2] hover:text-white',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#4267B2] hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: AiOutlineLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#0077B5] hover:text-white',
    },
    {
      name: 'Discord',
      icon: SiDiscord,
      href: `https://discord.com/share?url=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#5865F2] hover:text-white',
    },
    {
      name: 'Reddit',
      icon: SiReddit,
      href: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      color: 'hover:bg-[#FF4500] hover:text-white',
    },
    {
      name: 'Pinterest',
      icon: SiPinterest,
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
      color: 'hover:bg-[#E60023] hover:text-white',
    },
    {
      name: 'WeChat',
      icon: SiWechat,
      href: `weixin://dl/posts/${encodeURIComponent(url)}`,
      color: 'hover:bg-[#07C160] hover:text-white',
    },
    {
      name: 'LINE',
      icon: SiLine,
      href: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#00B900] hover:text-white',
    },
    {
      name: 'Weibo',
      icon: SiSinaweibo,
      href: `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      color: 'hover:bg-[#DF2029] hover:text-white',
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
      color: 'hover:bg-gray-600 hover:text-white',
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setIsCopied(true)
      toast.success('Link copied to clipboard!', {
        duration: 2000,
        className: 'bg-white',
        position: 'bottom-center',
        icon: <Check className="w-4 h-4 text-green-500" />,
      })
      // Close menu after successful copy
      setTimeout(() => setIsOpen(false), 1000)
    } catch (err) {
      toast.error('Failed to copy link', {
        duration: 2000,
        className: 'bg-white',
        position: 'bottom-center',
      })
      console.error('Failed to copy URL:', err)
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 bg-white hover:bg-purple-50 px-6 py-3 rounded-xl transition duration-200 border border-zinc-200 shadow-sm",
          isOpen && "bg-purple-50"
        )}
      >
        <Share2 className="w-5 h-5 text-purple-500" />
        <span className="text-zinc-700 font-medium">Share</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
          >
            <div className="p-2">
              <div className="grid grid-cols-3 gap-1">
                {shareLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 text-sm text-zinc-700 rounded-lg transition-colors",
                      link.color
                    )}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-zinc-100">
                <button
                  onClick={copyToClipboard}
                  className={cn(
                    "flex items-center justify-center gap-3 px-4 py-2 text-sm text-zinc-700 rounded-lg w-full transition-colors",
                    isCopied 
                      ? "bg-green-50 text-green-600 hover:bg-green-100"
                      : "hover:bg-purple-500 hover:text-white"
                  )}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Link2 className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 