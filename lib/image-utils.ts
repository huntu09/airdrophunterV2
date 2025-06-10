// Utility functions for image optimization
export function generateBlurDataURL(width = 60, height = 60): string {
  // Generate a simple blur placeholder
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#374151;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1f2937;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>`,
  ).toString("base64")}`
}

export function getImageSizes(type: "logo" | "banner" | "thumbnail"): string {
  switch (type) {
    case "logo":
      return "(max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
    case "banner":
      return "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    case "thumbnail":
      return "(max-width: 768px) 40px, 60px"
    default:
      return "100vw"
  }
}

export function shouldPrioritizeImage(index: number, isAboveFold = false): boolean {
  // Prioritize first 3 images or above-the-fold images
  return index < 3 || isAboveFold
}
