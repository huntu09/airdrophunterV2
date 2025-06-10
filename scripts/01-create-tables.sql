-- Create airdrops table
CREATE TABLE IF NOT EXISTS airdrops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  logo_url TEXT,
  description TEXT,
  about TEXT,
  status VARCHAR(20) DEFAULT 'UPCOMING' CHECK (status IN ('CONFIRMED', 'UPCOMING', 'ENDED')),
  website_url TEXT,
  telegram_url TEXT,
  twitter_url TEXT,
  discord_url TEXT,
  total_reward VARCHAR(100),
  participants_count INTEGER DEFAULT 0,
  deadline TIMESTAMP,
  is_hot BOOLEAN DEFAULT false,
  category VARCHAR(50) DEFAULT 'DeFi',
  blockchain VARCHAR(50) DEFAULT 'Ethereum',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create airdrop_steps table
CREATE TABLE IF NOT EXISTS airdrop_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  airdrop_id UUID REFERENCES airdrops(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  is_required BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  color VARCHAR(7) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
