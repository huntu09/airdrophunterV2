-- 🔍 AUDIT DATABASE SCHEMA & DATA
-- Check if logo column exists and has data

-- 1. Check table structure
\d airdrops;

-- 2. Check if logo column exists
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'airdrops' AND column_name = 'logo';

-- 3. Check actual logo data
SELECT id, name, logo, created_at 
FROM airdrops 
ORDER BY created_at DESC 
LIMIT 10;

-- 4. Check for empty/null logos
SELECT 
  COUNT(*) as total_airdrops,
  COUNT(logo) as airdrops_with_logo,
  COUNT(*) - COUNT(logo) as airdrops_without_logo
FROM airdrops;

-- 5. Show sample logo URLs
SELECT name, logo 
FROM airdrops 
WHERE logo IS NOT NULL AND logo != '' 
LIMIT 5;
