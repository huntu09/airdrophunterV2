-- PostgreSQL Version
-- Users Table
CREATE TABLE users (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  avatar VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'banned')),
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'premium', 'vip', 'admin')),
  join_date DATE NOT NULL,
  last_active TIMESTAMP,
  airdrops_joined INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Airdrops Table
CREATE TABLE airdrops (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo VARCHAR(255),
  description TEXT,
  category VARCHAR(20) NOT NULL CHECK (category IN ('latest', 'hottest', 'potential')),
  status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'confirmed', 'upcoming', 'ended')),
  reward VARCHAR(100),
  start_date DATE,
  participants INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0.0,
  total_ratings INTEGER DEFAULT 0,
  difficulty VARCHAR(10) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  social_links JSONB,
  steps JSONB,
  requirements JSONB,
  about JSONB,
  is_hot BOOLEAN DEFAULT FALSE,
  is_confirmed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_airdrops_updated_at BEFORE UPDATE ON airdrops
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Analytics Table
CREATE TABLE analytics (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Airdrop Participation
CREATE TABLE user_airdrops (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50),
  airdrop_id VARCHAR(50),
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'joined' CHECK (status IN ('joined', 'completed', 'failed')),
  earnings DECIMAL(10,2) DEFAULT 0.00,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (airdrop_id) REFERENCES airdrops(id) ON DELETE CASCADE
);

-- Admin Users Table
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  avatar VARCHAR(255),
  role VARCHAR(20) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Traffic Sources Table
CREATE TABLE traffic_sources (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  source VARCHAR(50) NOT NULL,
  visitors INTEGER DEFAULT 0,
  percentage DECIMAL(5,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_airdrops_category ON airdrops(category);
CREATE INDEX idx_airdrops_status ON airdrops(status);
CREATE INDEX idx_airdrops_start_date ON airdrops(start_date);
CREATE INDEX idx_user_airdrops_user_id ON user_airdrops(user_id);
CREATE INDEX idx_user_airdrops_airdrop_id ON user_airdrops(airdrop_id);
CREATE INDEX idx_analytics_date ON analytics(date);
