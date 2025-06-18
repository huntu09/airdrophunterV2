-- Check the current structure of airdrops table
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'airdrops' 
ORDER BY ordinal_position;

-- Check existing data
SELECT id, name, category, networks FROM airdrops LIMIT 5;

-- Check if networks column exists
SELECT EXISTS (
  SELECT 1 
  FROM information_schema.columns 
  WHERE table_name = 'airdrops' 
  AND column_name = 'networks'
);
