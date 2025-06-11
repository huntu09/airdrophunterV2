"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, ThumbsUp, Heart, Laugh, Reply, ChevronDown, ChevronUp } from "lucide-react"

interface Comment {
  id: string
  author_name: string
  content: string
  created_at: string
  like_count: number
  love_count: number
  haha_count: number
  reply_count: number
  replies?: Comment[]
}

interface CommentsSectionProps {
  airdropId: string
  theme: "dark" | "light"
}

// Add this hook at the top of the file after imports
const useSound = () => {
  const playSound = (soundType: string) => {
    try {
      const audio = new Audio(`/sounds/${soundType}.mp3`)
      audio.volume = 0.3
      audio.play().catch(() => {
        // Silently fail if audio can't play (browser restrictions)
      })
    } catch (error) {
      // Silently fail
    }
  }
  return { playSound }
}

// Generate avatar with initials
function generateAvatar(name: string) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-teal-500",
  ]

  const colorIndex = name.length % colors.length

  return (
    <div
      className={`w-10 h-10 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-bold text-sm`}
    >
      {initials}
    </div>
  )
}

// Format relative time
function formatRelativeTime(dateString: string) {
  const now = new Date()
  const date = new Date(dateString)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Baru saja"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit lalu`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam lalu`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} hari lalu`

  return date.toLocaleDateString("id-ID")
}

// Individual comment component
function CommentItem({
  comment,
  theme,
  onReact,
  onReply,
  isReply = false,
}: {
  comment: Comment
  theme: "dark" | "light"
  onReact: (commentId: string, reactionType: string) => void
  onReply: (commentId: string, authorName: string) => void
  isReply?: boolean
}) {
  const [showReplies, setShowReplies] = useState(false)

  // Add this inside CommentItem component
  const { playSound } = useSound()
  const [clickedReaction, setClickedReaction] = useState<string | null>(null)

  const handleReactionClick = (reactionType: string) => {
    setClickedReaction(reactionType)
    playSound(reactionType)
    onReact(comment.id, reactionType)

    // Reset animation after 300ms
    setTimeout(() => setClickedReaction(null), 300)
  }

  return (
    <div className={`${isReply ? "ml-12 mt-3" : ""}`}>
      <div
        className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-800/50" : "bg-gray-50"} hover:shadow-md transition-all duration-200`}
      >
        {/* Comment Header */}
        <div className="flex items-center gap-3 mb-3">
          {generateAvatar(comment.author_name)}
          <div>
            <h4 className="font-semibold text-sm">{comment.author_name}</h4>
            <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              ⏰ {formatRelativeTime(comment.created_at)}
            </p>
          </div>
        </div>

        {/* Comment Content */}
        <div className={`mb-3 text-sm leading-relaxed ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
          {comment.content}
        </div>

        {/* Reactions & Actions */}
        <div className="flex items-center gap-4 text-sm">
          {/* Like Button */}
          <button
            onClick={() => handleReactionClick("like")}
            className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 ${
              clickedReaction === "like" ? "animate-bounce" : ""
            } ${
              comment.like_count > 0
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-md"
                : "hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-600 dark:text-gray-300"
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${comment.like_count > 0 ? "fill-current" : ""}`} />
            {comment.like_count > 0 && <span className="font-semibold">{comment.like_count}</span>}
          </button>

          {/* Love Button */}
          <button
            onClick={() => handleReactionClick("love")}
            className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 ${
              clickedReaction === "love" ? "animate-pulse" : ""
            } ${
              comment.love_count > 0
                ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 shadow-md"
                : "hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-600 dark:text-gray-300"
            }`}
          >
            <Heart className={`w-4 h-4 ${comment.love_count > 0 ? "fill-current" : ""}`} />
            {comment.love_count > 0 && <span className="font-semibold">{comment.love_count}</span>}
          </button>

          {/* Haha Button */}
          <button
            onClick={() => handleReactionClick("haha")}
            className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 transform hover:scale-110 active:scale-95 ${
              clickedReaction === "haha" ? "animate-spin" : ""
            } ${
              comment.haha_count > 0
                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 shadow-md"
                : "hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-gray-600 dark:text-gray-300"
            }`}
          >
            <Laugh className={`w-4 h-4 ${comment.haha_count > 0 ? "fill-current" : ""}`} />
            {comment.haha_count > 0 && <span className="font-semibold">{comment.haha_count}</span>}
          </button>

          {/* Reply Button */}
          {!isReply && (
            <button
              onClick={() => onReply(comment.id, comment.author_name)}
              className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                theme === "dark" ? "text-gray-300 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Reply className="w-4 h-4" />
              <span className="font-medium">Balas</span>
            </button>
          )}
        </div>

        {/* Show Replies Toggle */}
        {!isReply && comment.reply_count > 0 && (
          <div className="mt-3">
            <button
              onClick={() => setShowReplies(!showReplies)}
              className={`flex items-center gap-2 text-sm font-medium ${
                theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
              } transition-colors`}
            >
              <MessageCircle className="w-4 h-4" />
              {comment.reply_count} balasan
              {showReplies ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Replies */}
      {!isReply && showReplies && comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              theme={theme}
              onReact={onReact}
              onReply={onReply}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function CommentsSection({ airdropId, theme }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    author_name: "",
    content: "",
    parent_id: null as string | null,
    replyTo: "",
  })
  const [error, setError] = useState("")

  // Fetch comments
  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?airdrop_id=${airdropId}`)
      const data = await response.json()

      if (response.ok) {
        setComments(data.comments || [])
      } else {
        console.error("Error fetching comments:", data.error)
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
    } finally {
      setLoading(false)
    }
  }

  // Submit comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.author_name.trim() || !formData.content.trim()) {
      setError("Nama dan komentar harus diisi")
      return
    }

    if (formData.content.length > 500) {
      setError("Komentar maksimal 500 karakter")
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          airdrop_id: airdropId,
          author_name: formData.author_name,
          content: formData.content,
          parent_id: formData.parent_id,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setFormData({ author_name: "", content: "", parent_id: null, replyTo: "" })
        fetchComments() // Refresh comments
      } else {
        setError(data.error || "Gagal mengirim komentar")
      }
    } catch (error) {
      setError("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setSubmitting(false)
    }
  }

  // Handle reactions
  const handleReact = async (commentId: string, reactionType: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction_type: reactionType }),
      })

      if (response.ok) {
        fetchComments() // Refresh to get updated counts
      }
    } catch (error) {
      console.error("Error reacting to comment:", error)
    }
  }

  // Handle reply
  const handleReply = (commentId: string, authorName: string) => {
    setFormData({
      ...formData,
      parent_id: commentId,
      replyTo: authorName,
      content: `@${authorName} `,
    })
    // Focus on textarea
    const textarea = document.querySelector("textarea")
    textarea?.focus()
  }

  useEffect(() => {
    fetchComments()
  }, [airdropId])

  if (loading) {
    return (
      <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-shadow duration-300`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
          <MessageCircle className="w-6 h-6" />
          Komentar ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {formData.replyTo && (
            <div
              className={`p-3 rounded-lg ${theme === "dark" ? "bg-blue-900/20 border border-blue-700" : "bg-blue-50 border border-blue-200"}`}
            >
              <p className="text-sm">
                Membalas <span className="font-semibold">@{formData.replyTo}</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, parent_id: null, replyTo: "", content: "" })}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Nama Anda"
              value={formData.author_name}
              onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
              className={theme === "dark" ? "bg-gray-700 border-gray-600" : ""}
              maxLength={100}
              required
            />
          </div>

          <div className="relative">
            <Textarea
              placeholder="Tulis komentar Anda..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className={`min-h-[100px] ${theme === "dark" ? "bg-gray-700 border-gray-600" : ""}`}
              maxLength={500}
              required
            />
            <div
              className={`absolute bottom-2 right-2 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              {formData.content.length}/500
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <Button type="submit" disabled={submitting} className="w-full md:w-auto">
            {submitting ? "Mengirim..." : formData.parent_id ? "Balas Komentar" : "Kirim Komentar"}
          </Button>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Belum ada komentar. Jadilah yang pertama berkomentar!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                theme={theme}
                onReact={handleReact}
                onReply={handleReply}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
