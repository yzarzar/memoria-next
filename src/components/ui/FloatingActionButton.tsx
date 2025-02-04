'use client'

import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FloatingActionButtonProps {
  onClick: () => void
  className?: string
  icon?: React.ReactNode
  label?: string
}

export function FloatingActionButton({
  onClick,
  className,
  icon = <Plus className="w-6 h-6" />,
  label = "Add New"
}: FloatingActionButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "fixed right-4 bottom-4 md:right-8 md:bottom-8 bg-purple-600 hover:bg-purple-500 text-white rounded-full shadow-lg group transition-all duration-300",
        "h-14 w-14 hover:w-auto hover:px-6",
        "flex items-center justify-center",
        className
      )}
    >
      {icon}
      <span className="w-0 overflow-hidden group-hover:w-auto group-hover:ml-2 transition-all duration-300 ease-in-out whitespace-nowrap">
        {label}
      </span>
    </motion.button>
  )
} 