-- Update airdrops table structure if needed
ALTER TABLE airdrops 
ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS about JSONB DEFAULT '{"overview":"","tokenomics":"","roadmap":""}',
ADD COLUMN IF NOT EXISTS steps JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS requirements JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS is_hot BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_confirmed BOOLEAN DEFAULT FALSE;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_airdrops_category ON airdrops(category);
CREATE INDEX IF NOT EXISTS idx_airdrops_status ON airdrops(status);
CREATE INDEX IF NOT EXISTS idx_airdrops_is_hot ON airdrops(is_hot);
CREATE INDEX IF NOT EXISTS idx_airdrops_is_confirmed ON airdrops(is_confirmed);
CREATE INDEX IF NOT EXISTS idx_airdrops_created_at ON airdrops(created_at);

-- Add full text search index
CREATE INDEX IF NOT EXISTS idx_airdrops_search ON airdrops USING gin(to_tsvector('english', name || ' ' || description || ' ' || action));
