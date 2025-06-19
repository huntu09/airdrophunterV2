-- Create user_ratings table for rating system
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

-- Add foreign key constraint if airdrops table exists
-- ALTER TABLE user_ratings ADD CONSTRAINT fk_user_ratings_airdrop 
-- FOREIGN KEY (airdrop_id) REFERENCES airdrops(id) ON DELETE CASCADE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_ratings_airdrop_id ON user_ratings(airdrop_id);
CREATE INDEX IF NOT EXISTS idx_user_ratings_user_ip ON user_ratings(user_ip);
CREATE INDEX IF NOT EXISTS idx_user_ratings_created_at ON user_ratings(created_at);

-- Create function to update airdrop rating statistics
CREATE OR REPLACE FUNCTION update_airdrop_rating_stats(p_airdrop_id VARCHAR(255))
RETURNS VOID AS $$
DECLARE
  avg_rating NUMERIC;
  total_ratings INTEGER;
BEGIN
  -- Calculate average rating and total ratings
  SELECT 
    COALESCE(ROUND(AVG(rating)::NUMERIC, 1), 0),
    COALESCE(COUNT(*), 0)
  INTO avg_rating, total_ratings
  FROM user_ratings 
  WHERE airdrop_id = p_airdrop_id;
  
  -- Update airdrops table
  UPDATE airdrops 
  SET 
    rating = avg_rating,
    total_ratings = total_ratings,
    updated_at = NOW()
  WHERE id = p_airdrop_id;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update rating stats
CREATE OR REPLACE FUNCTION trigger_update_airdrop_rating_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    PERFORM update_airdrop_rating_stats(NEW.airdrop_id);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM update_airdrop_rating_stats(OLD.airdrop_id);
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_user_ratings_update_stats ON user_ratings;
CREATE TRIGGER trigger_user_ratings_update_stats
  AFTER INSERT OR UPDATE OR DELETE ON user_ratings
  FOR EACH ROW EXECUTE FUNCTION trigger_update_airdrop_rating_stats();

-- Add some sample data for testing
INSERT INTO user_ratings (airdrop_id, user_ip, rating, user_agent) VALUES
('1', '192.168.1.1', 5, 'Mozilla/5.0 Test Browser'),
('1', '192.168.1.2', 4, 'Mozilla/5.0 Test Browser'),
('1', '192.168.1.3', 5, 'Mozilla/5.0 Test Browser'),
('2', '192.168.1.1', 3, 'Mozilla/5.0 Test Browser'),
('2', '192.168.1.4', 4, 'Mozilla/5.0 Test Browser')
ON CONFLICT (airdrop_id, user_ip) DO NOTHING;

-- Update existing airdrops rating stats
SELECT update_airdrop_rating_stats(id::VARCHAR) FROM airdrops;
