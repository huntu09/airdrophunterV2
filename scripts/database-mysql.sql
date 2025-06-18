-- MySQL Version (Alternative)
-- Users Table
CREATE TABLE users (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  avatar VARCHAR(255),
  status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
  role ENUM('user', 'premium', 'vip', 'admin') DEFAULT 'user',
  join_date DATE NOT NULL,
  last_active DATETIME,
  airdrops_joined INT DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Airdrops Table
CREATE TABLE airdrops (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo VARCHAR(255),
  description TEXT,
  category ENUM('latest', 'hottest', 'potential') NOT NULL,
  status ENUM('active', 'confirmed', 'upcoming', 'ended') NOT NULL,
  reward VARCHAR(100),
  start_date DATE,
  participants INT DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0.0,
  total_ratings INT DEFAULT 0,
  difficulty ENUM('Easy', 'Medium', 'Hard') NOT NULL,
  social_links JSON,
  steps JSON,
  requirements JSON,
  about JSON,
  is_hot BOOLEAN DEFAULT FALSE,
  is_confirmed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Analytics Table
CREATE TABLE analytics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  page_views INT DEFAULT 0,
  unique_visitors INT DEFAULT 0,
  clicks INT DEFAULT 0,
  conversions INT DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Airdrop Participation
CREATE TABLE user_airdrops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(50),
  airdrop_id VARCHAR(50),
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('joined', 'completed', 'failed') DEFAULT 'joined',
  earnings DECIMAL(10,2) DEFAULT 0.00,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (airdrop_id) REFERENCES airdrops(id) ON DELETE CASCADE
);

-- Admin Users Table
CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  avatar VARCHAR(255),
  role ENUM('admin', 'super_admin') DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  last_login DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Traffic Sources Table
CREATE TABLE traffic_sources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  source VARCHAR(50) NOT NULL,
  visitors INT DEFAULT 0,
  percentage DECIMAL(5,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_airdrops_category ON airdrops(category);
CREATE INDEX idx_airdrops_status ON airdrops(status);
CREATE INDEX idx_airdrops_start_date ON airdrops(start_date);
CREATE INDEX idx_user_airdrops_user_id ON user_airdrops(user_id);
CREATE INDEX idx_user_airdrops_airdrop_id ON user_airdrops(airdrop_id);
CREATE INDEX idx_analytics_date ON analytics(date);
