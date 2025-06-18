-- 🔧 Fix Supabase Storage Permissions and CORS

-- 1. Ensure bucket is public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'airdrop-assets';

-- 2. Set proper RLS policies for public access
CREATE POLICY IF NOT EXISTS "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'airdrop-assets');

-- 3. Allow public uploads (for admin)
CREATE POLICY IF NOT EXISTS "Admin Upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'airdrop-assets');

-- 4. Allow public updates (for admin)
CREATE POLICY IF NOT EXISTS "Admin Update" ON storage.objects
FOR UPDATE USING (bucket_id = 'airdrop-assets');

-- 5. Allow public deletes (for admin)
CREATE POLICY IF NOT EXISTS "Admin Delete" ON storage.objects
FOR DELETE USING (bucket_id = 'airdrop-assets');

-- 6. Verify bucket configuration
SELECT 
  id,
  name,
  public,
  created_at
FROM storage.buckets 
WHERE id = 'airdrop-assets';

-- 7. Check existing files
SELECT 
  name,
  bucket_id,
  metadata,
  created_at
FROM storage.objects 
WHERE bucket_id = 'airdrop-assets'
ORDER BY created_at DESC
LIMIT 10;
