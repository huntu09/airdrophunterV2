-- Add networks column to airdrops table
ALTER TABLE airdrops 
ADD COLUMN IF NOT EXISTS networks JSONB DEFAULT '[]'::jsonb;

-- Update existing airdrops with sample networks
UPDATE airdrops
SET networks = jsonb_build_array('ethereum', 'binance')
WHERE id = 1;

UPDATE airdrops
SET networks = jsonb_build_array('ethereum', 'solana', 'polygon')
WHERE id = 2;

UPDATE airdrops
SET networks = jsonb_build_array('solana', 'arbitrum', 'optimism')
WHERE id = 3;

-- Sample update for your "Anjing" airdrop
UPDATE airdrops
SET networks = jsonb_build_array('ethereum', 'binance', 'solana', 'polygon', 'avalanche')
WHERE name = 'Anjing';

-- Verify the updates
SELECT name, networks FROM airdrops;
