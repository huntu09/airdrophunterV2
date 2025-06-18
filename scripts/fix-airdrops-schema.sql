-- Fix airdrops table schema to match form requirements
ALTER TABLE airdrops 
ADD COLUMN IF NOT EXISTS action TEXT,
ADD COLUMN IF NOT EXISTS overview TEXT,
ADD COLUMN IF NOT EXISTS tokenomics TEXT,
ADD COLUMN IF NOT EXISTS roadmap TEXT;

-- Update existing records to have default action if null
UPDATE airdrops SET action = 'Participate in airdrop' WHERE action IS NULL;

-- Verify the schema
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'airdrops' 
ORDER BY ordinal_position;
