// ✅ Proper logging system
export class Logger {
  static info(message: string, data?: any) {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`, data)
  }

  static error(message: string, error?: any) {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error)

    // In production, send to external service
    if (process.env.NODE_ENV === "production") {
      // Send to Sentry, LogRocket, etc.
    }
  }

  static warn(message: string, data?: any) {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`, data)
  }
}
