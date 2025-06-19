-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7) DEFAULT '#7cb342',
    icon VARCHAR(50) DEFAULT 'folder',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, description, color, icon) VALUES
('DeFi', 'Decentralized Finance protocols and platforms', '#2196f3', 'coins'),
('Gaming', 'Blockchain gaming and GameFi projects', '#9c27b0', 'gamepad'),
('NFT', 'Non-Fungible Token marketplaces and platforms', '#ff9800', 'palette'),
('Layer 1', 'Layer 1 blockchain networks', '#f44336', 'shield'),
('Layer 2', 'Layer 2 scaling solutions', '#009688', 'zap'),
('Social', 'Social media and community platforms', '#e91e63', 'heart'),
('Infrastructure', 'Blockchain infrastructure and tools', '#3f51b5', 'star')
ON CONFLICT (name) DO NOTHING;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);
CREATE INDEX IF NOT EXISTS idx_categories_created_at ON categories(created_at);

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at 
    BEFORE UPDATE ON categories 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
