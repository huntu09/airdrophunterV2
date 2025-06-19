-- Fix the ambiguous column reference error
-- Drop existing function and recreate with proper variable names

DROP FUNCTION IF EXISTS update_airdrop_rating_stats(VARCHAR);
DROP FUNCTION IF EXISTS trigger_update_airdrop_rating_stats();
DROP TRIGGER IF EXISTS trigger_user_ratings_update_stats ON user_ratings;

-- Create fixed function with different variable names
CREATE OR REPLACE FUNCTION update_airdrop_rating_stats(p_airdrop_id VARCHAR(255))
RETURNS VOID AS $$
DECLARE
  v_avg_rating NUMERIC;
  v_total_ratings INTEGER;
BEGIN
  -- Calculate average rating and total ratings
  SELECT 
    COALESCE(ROUND(AVG(rating)::NUMERIC, 1), 0),
    COALESCE(COUNT(*), 0)
  INTO v_avg_rating, v_total_ratings
  FROM user_ratings 
  WHERE airdrop_id = p_airdrop_id;
  
  -- Update airdrops table with explicit column references
  UPDATE airdrops 
  SET 
    rating = v_avg_rating,
    total_ratings = v_total_ratings,
    updated_at = NOW()
  WHERE id = p_airdrop_id;
  
  -- Log the update for debugging
  RAISE NOTICE 'Updated airdrop % with rating % and % total ratings', p_airdrop_id, v_avg_rating, v_total_ratings;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger function
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

-- Recreate trigger
CREATE TRIGGER trigger_user_ratings_update_stats
  AFTER INSERT OR UPDATE OR DELETE ON user_ratings
  FOR EACH ROW EXECUTE FUNCTION trigger_update_airdrop_rating_stats();

-- Test the function
SELECT update_airdrop_rating_stats('1');

-- Verify the fix worked
SELECT id, rating, total_ratings FROM airdrops WHERE id IN ('1', '2') LIMIT 5;
