-- Fix airdrops table ID column to auto-increment
ALTER TABLE airdrops ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- Ensure the table has proper structure
DO $$ 
BEGIN
    -- Check if id column exists and fix it
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'airdrops' AND column_name = 'id') THEN
        -- Make sure id is UUID with default
        ALTER TABLE airdrops ALTER COLUMN id SET DEFAULT gen_random_uuid();
        ALTER TABLE airdrops ALTER COLUMN id SET NOT NULL;
    ELSE
        -- Add id column if it doesn't exist
        ALTER TABLE airdrops ADD COLUMN id UUID DEFAULT gen_random_uuid() PRIMARY KEY;
    END IF;

    -- Ensure other required columns exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'airdrops' AND column_name = 'action') THEN
        ALTER TABLE airdrops ADD COLUMN action TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'airdrops' AND column_name = 'overview') THEN
        ALTER TABLE airdrops ADD COLUMN overview TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'airdrops' AND column_name = 'tokenomics') THEN
        ALTER TABLE airdrops ADD COLUMN tokenomics TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'airdrops' AND column_name = 'roadmap') THEN
        ALTER TABLE airdrops ADD COLUMN roadmap TEXT;
    END IF;

    -- Ensure created_at and updated_at have defaults
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'airdrops' AND column_name = 'created_at') THEN
        ALTER TABLE airdrops ALTER COLUMN created_at SET DEFAULT NOW();
    ELSE
        ALTER TABLE airdrops ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'airdrops' AND column_name = 'updated_at') THEN
        ALTER TABLE airdrops ALTER COLUMN updated_at SET DEFAULT NOW();
    ELSE
        ALTER TABLE airdrops ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_airdrops_updated_at ON airdrops;
CREATE TRIGGER update_airdrops_updated_at
    BEFORE UPDATE ON airdrops
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
