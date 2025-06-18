-- Add networks column to airdrops table
ALTER TABLE airdrops 
ADD COLUMN IF NOT EXISTS networks JSONB DEFAULT '[]'::jsonb;

-- First, let's see what IDs we have in the database
-- SELECT id, name FROM airdrops LIMIT 5;

-- Update existing airdrops with sample networks using name instead of ID
UPDATE airdrops
SET networks = jsonb_build_array('ethereum', 'binance')
WHERE name ILIKE '%test%' OR name ILIKE '%sample%';

-- Update your "Anjing" airdrop specifically
UPDATE airdrops
SET networks = jsonb_build_array('ethereum', 'binance', 'solana', 'polygon', 'avalanche')
WHERE name = 'Anjing';

-- Update all existing airdrops with default networks if they don't have any
UPDATE airdrops
SET networks = jsonb_build_array('ethereum')
WHERE networks IS NULL OR networks = '[]'::jsonb;

-- Add some variety to existing airdrops based on category
UPDATE airdrops
SET networks = jsonb_build_array('ethereum', 'polygon', 'arbitrum')
WHERE category = 'latest' AND (networks IS NULL OR networks = '[]'::jsonb);

UPDATE airdrops
SET networks = jsonb_build_array('solana', 'avalanche', 'base')
WHERE category = 'hottest' AND (networks IS NULL OR networks = '[]'::jsonb);

UPDATE airdrops
SET networks = jsonb_build_array('ethereum', 'binance', 'optimism')
WHERE category = 'potential' AND (networks IS NULL OR networks = '[]'::jsonb);

-- Verify the updates
SELECT name, networks, category FROM airdrops ORDER BY created_at DESC LIMIT 10;

-- Show count of airdrops by network
SELECT 
  network,
  COUNT(*) as count
FROM airdrops,
  jsonb_array_elements_text(networks) as network
GROUP BY network
ORDER BY count DESC;
