'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Smile, Maximize2, Minimize2, MoreHorizontal, Edit3, Trash2, Ban } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import profile_photo from '@/assets/images/profile.jpeg'
import { currentUser } from '@/app/event/data'
import { cn } from '@/lib/utils'

interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
  eventId: string
  comments: {
    id: string
    author: {
      id: string
      name: string
      email: string
      avatar: StaticImageData
    }
    content: string
    createdAt: string
    likes: number
  }[]
}

export function CommentModal({ isOpen, onClose, eventId, comments }: CommentModalProps) {
  const [newComment, setNewComment] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [editingComment, setEditingComment] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeMenu) {
        const target = event.target as HTMLElement;
        if (!target.closest('.comment-menu')) {
          setActiveMenu(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMenu]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement comment submission
    setNewComment('')
  }

  const canModifyComment = (comment: any) => comment.author.id === currentUser.id

  const handleEdit = (comment: any) => {
    setEditingComment(comment.id)
    setEditText(comment.content)
    setActiveMenu(null)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className={cn(
              "fixed w-full bg-white shadow-xl z-50 flex flex-col",
              isExpanded 
                ? "inset-0 md:inset-16 rounded-none md:rounded-2xl max-h-[100vh] md:max-h-[90vh] md:max-w-4xl md:mx-auto" 
                : "inset-x-0 bottom-0 md:inset-x-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg rounded-t-2xl md:rounded-2xl max-h-[85vh] md:max-h-[90vh]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b flex-shrink-0">
              <h2 className="text-lg font-semibold text-zinc-900">Comments</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  {isExpanded ? (
                    <Minimize2 className="w-5 h-5 text-zinc-500" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-zinc-500" />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-500" />
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {comments.length === 0 ? (
                <div className="text-center text-zinc-500 py-8">
                  No comments yet. Be the first to comment!
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 group">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      {editingComment === comment.id ? (
                        // Edit mode
                        <div className="flex-1">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/10 resize-none"
                            rows={3}
                            autoFocus
                          />
                          <div className="mt-2 flex gap-2">
                            <button
                              onClick={() => {
                                // TODO: Implement save functionality
                                console.log('Saving:', editText)
                                setEditingComment(null)
                              }}
                              className="px-3 py-1 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-500"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingComment(null)}
                              className="px-3 py-1 text-sm font-medium text-zinc-600 hover:text-zinc-800"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Normal view
                        <>
                          <div className="flex items-start gap-2 group">
                            <div className="bg-zinc-100 rounded-2xl px-4 py-2">
                              <span className="font-medium text-zinc-900 block mb-1">
                                {comment.author.name}
                              </span>
                              <p className="text-zinc-700 text-sm whitespace-pre-line">{comment.content}</p>
                            </div>
                            
                            <div className="relative comment-menu mt-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenu(activeMenu === comment.id ? null : comment.id);
                                }}
                                className="p-1.5 rounded-full hover:bg-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreHorizontal className="w-4 h-4 text-zinc-500" />
                              </button>

                              <AnimatePresence>
                                {activeMenu === comment.id && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute right-0 top-full mt-1 w-[250px] bg-white rounded-xl shadow-xl overflow-hidden z-50"
                                    style={{
                                      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.12)'
                                    }}
                                  >
                                    {canModifyComment(comment) ? (
                                      <>
                                        <button
                                          onClick={() => handleEdit(comment)}
                                          className="flex items-center w-full px-4 py-2.5 text-[13px] text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200 transition-colors"
                                        >
                                          <Edit3 className="w-4 h-4 mr-2.5 text-zinc-500 flex-shrink-0" />
                                          <span className="truncate">Edit comment</span>
                                        </button>
                                        <button
                                          onClick={() => {
                                            // Handle delete
                                            setActiveMenu(null)
                                          }}
                                          className="flex items-center w-full px-4 py-2.5 text-[13px] text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200 transition-colors"
                                        >
                                          <Trash2 className="w-4 h-4 mr-2.5 text-zinc-500 flex-shrink-0" />
                                          <span className="truncate">Delete comment</span>
                                        </button>
                                      </>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          // Handle block
                                          setActiveMenu(null)
                                        }}
                                        className="flex items-center w-full px-4 py-2.5 text-[13px] text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200 transition-colors"
                                      >
                                        <Ban className="w-4 h-4 mr-2.5 text-zinc-500 flex-shrink-0" />
                                        <span className="truncate">Block {comment.author.name}</span>
                                      </button>
                                    )}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>

                          <div className="flex gap-4 mt-1 text-xs text-zinc-500">
                            <button className="hover:text-zinc-700">
                              Like · {comment.likes}
                            </button>
                            <button className="hover:text-zinc-700">Reply</button>
                            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment Input */}
            <form onSubmit={handleSubmit} className="p-4 md:p-6 border-t flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex items-center gap-2 bg-zinc-100 rounded-full px-4 py-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                  />
                  <button type="button" className="p-1 hover:bg-zinc-200 rounded-full flex-shrink-0">
                    <Smile className="w-5 h-5 text-zinc-500" />
                  </button>
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="p-1 hover:bg-zinc-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    <Send className="w-5 h-5 text-purple-500" />
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 