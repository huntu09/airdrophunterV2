const webpush = require("web-push")

// Generate VAPID keys
const vapidKeys = webpush.generateVAPIDKeys()

console.log("=".repeat(50))
console.log("🔑 VAPID KEYS GENERATED SUCCESSFULLY!")
console.log("=".repeat(50))
console.log("")
console.log("📋 ADD THESE TO YOUR .ENV FILE:")
console.log("")
console.log(`VAPID_PUBLIC_KEY=${vapidKeys.publicKey}`)
console.log(`VAPID_PRIVATE_KEY=${vapidKeys.privateKey}`)
console.log("")
console.log("=".repeat(50))
console.log("✅ Copy the keys above to your .env file")
console.log("🚀 Then restart your development server")
console.log("=".repeat(50))
