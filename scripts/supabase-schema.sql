-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create airdrops table
CREATE TABLE IF NOT EXISTS airdrops (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo TEXT,
    description TEXT NOT NULL,
    action VARCHAR(500) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('latest', 'hottest', 'potential')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'confirmed', 'upcoming', 'ended')),
    reward VARCHAR(255),
    start_date DATE,
    difficulty VARCHAR(50) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    social_links JSONB DEFAULT '{}',
    about JSONB DEFAULT '{"overview": "", "tokenomics": "", "roadmap": ""}',
    steps JSONB DEFAULT '[]',
    requirements JSONB DEFAULT '[]',
    is_hot BOOLEAN DEFAULT FALSE,
    is_confirmed BOOLEAN DEFAULT FALSE,
    participants INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_ratings INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_airdrops_category ON airdrops(category);
CREATE INDEX IF NOT EXISTS idx_airdrops_status ON airdrops(status);
CREATE INDEX IF NOT EXISTS idx_airdrops_is_hot ON airdrops(is_hot);
CREATE INDEX IF NOT EXISTS idx_airdrops_is_confirmed ON airdrops(is_confirmed);
CREATE INDEX IF NOT EXISTS idx_airdrops_created_at ON airdrops(created_at);
CREATE INDEX IF NOT EXISTS idx_airdrops_name ON airdrops USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_airdrops_description ON airdrops USING gin(to_tsvector('english', description));

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_airdrops_updated_at 
    BEFORE UPDATE ON airdrops 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create users table for admin authentication (if needed later)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE airdrops ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to airdrops
CREATE POLICY "Allow public read access to airdrops" ON airdrops
    FOR SELECT USING (true);

-- Create policies for authenticated admin access
CREATE POLICY "Allow authenticated admin full access to airdrops" ON airdrops
    FOR ALL USING (auth.role() = 'authenticated');

-- Create storage bucket for airdrop assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('airdrop-assets', 'airdrop-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public read access
CREATE POLICY "Allow public read access to airdrop assets" ON storage.objects
    FOR SELECT USING (bucket_id = 'airdrop-assets');

-- Create storage policy for authenticated upload access
CREATE POLICY "Allow authenticated upload to airdrop assets" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'airdrop-assets' AND auth.role() = 'authenticated');

-- Create storage policy for authenticated delete access
CREATE POLICY "Allow authenticated delete from airdrop assets" ON storage.objects
    FOR DELETE USING (bucket_id = 'airdrop-assets' AND auth.role() = 'authenticated');
