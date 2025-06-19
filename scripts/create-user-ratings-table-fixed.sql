-- Create user_ratings table for rating system (FIXED VERSION)
CREATE TABLE IF NOT EXISTS user_ratings (
  id SERIAL PRIMARY KEY,
  airdrop_id VARCHAR(255) NOT NULL,
  user_ip VARCHAR(45) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_user_airdrop_rating UNIQUE(airdrop_id, user_ip)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_ratings_airdrop_id ON user_ratings(airdrop_id);
CREATE INDEX IF NOT EXISTS idx_user_ratings_user_ip ON user_ratings(user_ip);
CREATE INDEX IF NOT EXISTS idx_user_ratings_created_at ON user_ratings(created_at);

-- Add some sample data for testing (only if table is empty)
INSERT INTO user_ratings (airdrop_id, user_ip, rating, user_agent) 
SELECT '1', '192.168.1.1', 5, 'Mozilla/5.0 Test Browser'
WHERE NOT EXISTS (SELECT 1 FROM user_ratings WHERE airdrop_id = '1' AND user_ip = '192.168.1.1');

INSERT INTO user_ratings (airdrop_id, user_ip, rating, user_agent) 
SELECT '1', '192.168.1.2', 4, 'Mozilla/5.0 Test Browser'
WHERE NOT EXISTS (SELECT 1 FROM user_ratings WHERE airdrop_id = '1' AND user_ip = '192.168.1.2');

INSERT INTO user_ratings (airdrop_id, user_ip, rating, user_agent) 
SELECT '1', '192.168.1.3', 5, 'Mozilla/5.0 Test Browser'
WHERE NOT EXISTS (SELECT 1 FROM user_ratings WHERE airdrop_id = '1' AND user_ip = '192.168.1.3');

INSERT INTO user_ratings (airdrop_id, user_ip, rating, user_agent) 
SELECT '2', '192.168.1.1', 3, 'Mozilla/5.0 Test Browser'
WHERE NOT EXISTS (SELECT 1 FROM user_ratings WHERE airdrop_id = '2' AND user_ip = '192.168.1.1');

INSERT INTO user_ratings (airdrop_id, user_ip, rating, user_agent) 
SELECT '2', '192.168.1.4', 4, 'Mozilla/5.0 Test Browser'
WHERE NOT EXISTS (SELECT 1 FROM user_ratings WHERE airdrop_id = '2' AND user_ip = '192.168.1.4');
