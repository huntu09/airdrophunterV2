-- 🔍 COMPREHENSIVE LOGO AUDIT SCRIPT
-- Run this to diagnose all logo-related issues

-- 1. Check table structure
SELECT 
    column_name, 
    data_type, 
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'airdrops' 
ORDER BY ordinal_position;

-- 2. Check if logo column exists and its properties
SELECT 
    EXISTS(
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'airdrops' AND column_name = 'logo'
    ) as logo_column_exists;

-- 3. Sample of actual logo data
SELECT 
    id,
    name,
    logo,
    CASE 
        WHEN logo IS NULL THEN 'NULL'
        WHEN logo = '' THEN 'EMPTY'
        WHEN logo LIKE '%placeholder.svg%' THEN 'PLACEHOLDER'
        WHEN logo LIKE '%supabase%' THEN 'SUPABASE'
        ELSE 'OTHER'
    END as logo_type,
    LENGTH(logo) as logo_length,
    created_at
FROM airdrops 
ORDER BY created_at DESC 
LIMIT 10;

-- 4. Logo statistics
SELECT 
    COUNT(*) as total_airdrops,
    COUNT(logo) as airdrops_with_logo,
    COUNT(*) - COUNT(logo) as airdrops_without_logo,
    COUNT(CASE WHEN logo LIKE '%placeholder.svg%' THEN 1 END) as placeholder_logos,
    COUNT(CASE WHEN logo LIKE '%supabase%' THEN 1 END) as supabase_logos,
    COUNT(CASE WHEN logo IS NOT NULL AND logo != '' AND logo NOT LIKE '%placeholder.svg%' THEN 1 END) as real_logos
FROM airdrops;

-- 5. Show all unique logo patterns
SELECT 
    CASE 
        WHEN logo IS NULL THEN 'NULL'
        WHEN logo = '' THEN 'EMPTY'
        WHEN logo LIKE '%placeholder.svg%' THEN 'PLACEHOLDER'
        WHEN logo LIKE '%supabase%' THEN 'SUPABASE'
        WHEN logo LIKE 'http%' THEN 'HTTP_URL'
        WHEN logo LIKE 'https%' THEN 'HTTPS_URL'
        ELSE 'OTHER'
    END as logo_pattern,
    COUNT(*) as count,
    MIN(logo) as example_logo
FROM airdrops 
GROUP BY 
    CASE 
        WHEN logo IS NULL THEN 'NULL'
        WHEN logo = '' THEN 'EMPTY'
        WHEN logo LIKE '%placeholder.svg%' THEN 'PLACEHOLDER'
        WHEN logo LIKE '%supabase%' THEN 'SUPABASE'
        WHEN logo LIKE 'http%' THEN 'HTTP_URL'
        WHEN logo LIKE 'https%' THEN 'HTTPS_URL'
        ELSE 'OTHER'
    END
ORDER BY count DESC;

-- 6. Recent airdrops with their logo status
SELECT 
    name,
    logo,
    CASE 
        WHEN logo IS NULL THEN '❌ NULL'
        WHEN logo = '' THEN '❌ EMPTY'
        WHEN logo LIKE '%placeholder.svg%' THEN '⚠️ PLACEHOLDER'
        WHEN logo LIKE '%supabase%' THEN '✅ SUPABASE'
        ELSE '✅ CUSTOM'
    END as logo_status,
    created_at
FROM airdrops 
ORDER BY created_at DESC 
LIMIT 20;
