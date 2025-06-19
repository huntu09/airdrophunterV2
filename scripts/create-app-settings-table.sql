-- Create app_settings table for storing application settings
CREATE TABLE IF NOT EXISTS app_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    settings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT single_settings_row CHECK (id = 1)
);

-- Create admin_activity table for logging admin actions
CREATE TABLE IF NOT EXISTS admin_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action VARCHAR(100) NOT NULL,
    details JSONB DEFAULT '{}',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_activity_timestamp ON admin_activity(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_admin_activity_action ON admin_activity(action);

-- Insert default settings if none exist
INSERT INTO app_settings (id, settings) 
VALUES (1, '{
    "siteName": "AirdropHunter",
    "siteDescription": "Your ultimate crypto co-pilot for discovering profitable airdrops",
    "siteUrl": "https://airdrophunter.com",
    "adminEmail": "admin@airdrophunter.com",
    "enableNotifications": true,
    "enableAnalytics": true,
    "maintenanceMode": false,
    "autoApproveAirdrops": false,
    "maxAirdropsPerPage": 10,
    "emailNotifications": true,
    "smsNotifications": false,
    "themeColor": "#7cb342",
    "twoFactorEnabled": false,
    "sessionTimeout": 24,
    "maxLoginAttempts": 5,
    "backupFrequency": "daily",
    "enableRateLimiting": true,
    "apiRateLimit": 100
}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Add RLS policies if using Supabase
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity ENABLE ROW LEVEL SECURITY;

-- Policy for app_settings (admin only)
CREATE POLICY "Admin can manage settings" ON app_settings
    FOR ALL USING (true); -- In production, add proper admin check

-- Policy for admin_activity (admin only)
CREATE POLICY "Admin can view activity" ON admin_activity
    FOR SELECT USING (true); -- In production, add proper admin check

CREATE POLICY "Admin can insert activity" ON admin_activity
    FOR INSERT WITH CHECK (true); -- In production, add proper admin check
