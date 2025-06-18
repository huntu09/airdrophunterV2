import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 UPLOAD AUDIT - Starting upload process")

    const data = await request.formData()
    const file: File | null = data.get("file") as unknown as File

    if (!file) {
      console.log("🔍 UPLOAD ERROR - No file provided")
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 })
    }

    console.log("🔍 UPLOAD AUDIT - File details:", {
      name: file.name,
      size: file.size,
      type: file.type,
    })

    // Validate file type
    if (!file.type.startsWith("image/")) {
      console.log("🔍 UPLOAD ERROR - Invalid file type:", file.type)
      return NextResponse.json({ success: false, error: "Only image files are allowed" }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.log("🔍 UPLOAD ERROR - File too large:", file.size)
      return NextResponse.json({ success: false, error: "File size must be less than 5MB" }, { status: 400 })
    }

    const supabase = createServerClient()

    // First, ensure the bucket exists
    console.log("🔍 UPLOAD AUDIT - Checking bucket existence")
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()

    if (bucketsError) {
      console.error("🔍 UPLOAD ERROR - Error listing buckets:", bucketsError)
      return NextResponse.json(
        { success: false, error: "Storage service error", details: bucketsError.message },
        { status: 500 },
      )
    }

    const bucketExists = buckets?.some((bucket) => bucket.name === "airdrop-assets")
    console.log("🔍 UPLOAD AUDIT - Bucket exists:", bucketExists)

    if (!bucketExists) {
      console.log("🔍 UPLOAD AUDIT - Creating bucket")
      // Try to create the bucket
      const { error: createBucketError } = await supabase.storage.createBucket("airdrop-assets", {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"],
      })

      if (createBucketError) {
        console.error("🔍 UPLOAD ERROR - Error creating bucket:", createBucketError)
        return NextResponse.json(
          { success: false, error: "Failed to create storage bucket", details: createBucketError.message },
          { status: 500 },
        )
      }
      console.log("🔍 UPLOAD SUCCESS - Bucket created")
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split(".").pop()
    const filename = `airdrop-${timestamp}.${extension}`
    const filePath = `logos/${filename}`

    console.log("🔍 UPLOAD AUDIT - Generated file path:", filePath)

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = new Uint8Array(bytes)

    console.log("🔍 UPLOAD AUDIT - Starting Supabase upload")

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("airdrop-assets")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error("🔍 UPLOAD ERROR - Supabase upload failed:", uploadError)
      return NextResponse.json(
        { success: false, error: "Failed to upload file", details: uploadError.message },
        { status: 500 },
      )
    }

    console.log("🔍 UPLOAD SUCCESS - File uploaded:", uploadData)

    // Get public URL
    const { data: urlData } = supabase.storage.from("airdrop-assets").getPublicUrl(filePath)

    const finalUrl = urlData.publicUrl
    console.log("🔍 UPLOAD AUDIT - Final public URL:", finalUrl)

    // 🔍 CRITICAL: Test if URL is accessible
    try {
      const testResponse = await fetch(finalUrl, { method: "HEAD" })
      console.log("🔍 URL TEST - Status:", testResponse.status, "URL accessible:", testResponse.ok)
    } catch (testError) {
      console.log("🔍 URL TEST ERROR:", testError)
    }

    const responseData = {
      success: true,
      data: {
        url: finalUrl,
        filename: filename,
        path: filePath,
      },
      message: "File uploaded successfully",
    }

    console.log("🔍 UPLOAD AUDIT - Returning response:", responseData)

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("🔍 UPLOAD CRITICAL ERROR:", error)
    return NextResponse.json(
      { success: false, error: "Failed to upload file", details: error.message },
      { status: 500 },
    )
  }
}
