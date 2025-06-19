-- First, add category_id column to airdrops table if it doesn't exist
ALTER TABLE airdrops 
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_airdrops_category_id ON airdrops(category_id);

-- Update existing airdrops to have default categories based on their type/name
-- You can customize this logic based on your existing data
UPDATE airdrops 
SET category_id = (
    SELECT id FROM categories 
    WHERE name = CASE 
        WHEN LOWER(airdrops.name) LIKE '%defi%' OR LOWER(airdrops.description) LIKE '%defi%' THEN 'DeFi'
        WHEN LOWER(airdrops.name) LIKE '%game%' OR LOWER(airdrops.description) LIKE '%game%' THEN 'Gaming'
        WHEN LOWER(airdrops.name) LIKE '%nft%' OR LOWER(airdrops.description) LIKE '%nft%' THEN 'NFT'
        WHEN LOWER(airdrops.name) LIKE '%layer%' OR LOWER(airdrops.description) LIKE '%layer%' THEN 'Layer 1'
        ELSE 'DeFi'
    END
    LIMIT 1
)
WHERE category_id IS NULL;

-- Create a view for categories with airdrop counts
CREATE OR REPLACE VIEW categories_with_counts AS
SELECT 
    c.*,
    COALESCE(COUNT(a.id), 0) as airdrop_count
FROM categories c
LEFT JOIN airdrops a ON c.id = a.category_id
GROUP BY c.id, c.name, c.description, c.color, c.icon, c.created_at, c.updated_at;
