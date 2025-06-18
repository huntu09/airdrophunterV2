-- Safe way to add networks to existing airdrops

-- Step 1: Add networks column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'airdrops' AND column_name = 'networks'
  ) THEN
    ALTER TABLE airdrops ADD COLUMN networks JSONB DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Step 2: Update networks based on airdrop names or categories
-- Update specific airdrop by name
UPDATE airdrops
SET networks = '["ethereum", "binance", "solana", "polygon", "avalanche"]'::jsonb
WHERE name = 'Anjing';

-- Step 3: Add default networks to airdrops that don't have any
UPDATE airdrops
SET networks = CASE 
  WHEN category = 'latest' THEN '["ethereum", "polygon"]'::jsonb
  WHEN category = 'hottest' THEN '["ethereum", "binance", "solana"]'::jsonb
  WHEN category = 'potential' THEN '["ethereum", "arbitrum", "optimism"]'::jsonb
  ELSE '["ethereum"]'::jsonb
END
WHERE networks IS NULL OR networks = '[]'::jsonb;

-- Step 4: Verify the results
SELECT 
  name, 
  category, 
  networks,
  jsonb_array_length(networks) as network_count
FROM airdrops 
ORDER BY created_at DESC 
LIMIT 10;
