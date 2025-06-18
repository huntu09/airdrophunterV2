"use client"

interface TextWithLinksProps {
  children: string
  className?: string
}

export function TextWithLinks({ children, className = "" }: TextWithLinksProps) {
  // Regex untuk mendeteksi URL
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g

  // Split text berdasarkan URL
  const parts = children.split(urlRegex)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Cek apakah part adalah URL
        if (part.match(urlRegex)) {
          // Pastikan URL punya protocol
          const url = part.startsWith("http") ? part : `https://${part}`

          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline break-all transition-colors duration-200"
            >
              {part}
            </a>
          )
        }

        // Return text biasa
        return <span key={index}>{part}</span>
      })}
    </span>
  )
}
