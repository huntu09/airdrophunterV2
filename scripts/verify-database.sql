-- Verify Database Setup
SELECT 'Database Verification Report' as title;

-- Check tables exist
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check record counts
SELECT 'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'airdrops' as table_name, COUNT(*) as record_count FROM airdrops
UNION ALL
SELECT 'admin_users' as table_name, COUNT(*) as record_count FROM admin_users
UNION ALL
SELECT 'user_airdrops' as table_name, COUNT(*) as record_count FROM user_airdrops
UNION ALL
SELECT 'analytics' as table_name, COUNT(*) as record_count FROM analytics
UNION ALL
SELECT 'traffic_sources' as table_name, COUNT(*) as record_count FROM traffic_sources;

-- Check sample data
SELECT 'Sample Users:' as info;
SELECT id, name, email, status, role, airdrops_joined, total_earnings FROM users LIMIT 5;

SELECT 'Sample Airdrops:' as info;
SELECT id, name, category, status, participants, rating, reward FROM airdrops LIMIT 5;

SELECT 'Database setup completed successfully!' as final_message;
