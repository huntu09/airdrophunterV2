-- Insert categories
INSERT INTO categories (name, slug, color) VALUES
('DeFi', 'defi', '#10B981'),
('NFT', 'nft', '#8B5CF6'),
('Gaming', 'gaming', '#F59E0B'),
('Layer 1', 'layer1', '#3B82F6'),
('Layer 2', 'layer2', '#06B6D4'),
('Metaverse', 'metaverse', '#EC4899'),
('AI', 'ai', '#EF4444'),
('Social', 'social', '#84CC16')
ON CONFLICT (slug) DO NOTHING;
