-- Insert Sample Data for PostgreSQL

-- Insert Admin Users
INSERT INTO admin_users (username, email, password_hash, full_name, role) VALUES
('admin', 'admin@airdrophunter.com', '$2b$10$example_hash_here_replace_with_real_hash', 'Admin User', 'super_admin'),
('moderator', 'mod@airdrophunter.com', '$2b$10$example_hash_here_replace_with_real_hash', 'Moderator User', 'admin');

-- Insert Sample Users
INSERT INTO users (id, name, email, avatar, status, role, join_date, last_active, airdrops_joined, total_earnings) VALUES
('user_1', 'John Doe', 'john@example.com', '/placeholder.svg?height=40&width=40', 'active', 'user', '2024-06-15', '2024-06-16 10:30:00', 12, 1250.00),
('user_2', 'Jane Smith', 'jane@example.com', '/placeholder.svg?height=40&width=40', 'active', 'premium', '2024-06-14', '2024-06-16 09:15:00', 25, 3450.00),
('user_3', 'Mike Johnson', 'mike@example.com', '/placeholder.svg?height=40&width=40', 'inactive', 'user', '2024-06-13', '2024-06-14 14:20:00', 5, 320.00),
('user_4', 'Sarah Wilson', 'sarah@example.com', '/placeholder.svg?height=40&width=40', 'banned', 'user', '2024-06-10', '2024-06-12 16:45:00', 3, 150.00),
('user_5', 'David Brown', 'david@example.com', '/placeholder.svg?height=40&width=40', 'active', 'vip', '2024-05-28', '2024-06-16 11:00:00', 45, 8750.00);

-- Insert Sample Airdrops
INSERT INTO airdrops (
    id, name, logo, description, category, status, reward, start_date, 
    participants, rating, total_ratings, difficulty, 
    social_links, steps, requirements, about, is_hot, is_confirmed
) VALUES
(
    'airdrop_1', 
    'Lendasat', 
    '/placeholder.svg?height=48&width=48&text=L',
    'Decentralized lending protocol with innovative borrowing mechanisms',
    'latest',
    'active',
    '$50-500 LEND',
    '2024-07-15',
    1234,
    4.2,
    156,
    'Medium',
    '{"telegram": "https://t.me/lendasat", "twitter": "https://twitter.com/lendasat", "website": "https://lendasat.io"}',
    '["Connect your wallet to Lendasat platform", "Complete KYC verification", "Make a minimum deposit of $100", "Perform at least 3 lending or borrowing transactions", "Hold position for minimum 30 days"]',
    '["Minimum $100 deposit", "Valid wallet connection", "Complete KYC", "Active for 30+ days"]',
    '{"overview": "Lendasat is a revolutionary decentralized lending protocol that introduces innovative borrowing mechanisms to the DeFi ecosystem.", "tokenomics": "Total Supply: 1B LEND tokens. 40% for community rewards, 25% for team (4-year vesting), 20% for ecosystem development, 15% for strategic partnerships", "roadmap": "Q2 2024: Mainnet launch, Q3 2024: Cross-chain integration, Q4 2024: Mobile app release"}',
    false,
    false
),
(
    'airdrop_2',
    'Scroll Protocol',
    '/placeholder.svg?height=48&width=48&text=S',
    'Layer 2 scaling solution with zkEVM technology',
    'latest',
    'active',
    'TBA SCR',
    '2024-08-20',
    2567,
    4.6,
    234,
    'Easy',
    '{"telegram": "https://t.me/scrollprotocol", "twitter": "https://twitter.com/scroll_zkp", "website": "https://scroll.io"}',
    '["Bridge ETH to Scroll network", "Interact with native dApps", "Provide liquidity on DEXs", "Complete weekly tasks", "Hold bridged assets for 30+ days"]',
    '["Minimum $50 bridge", "Complete 5+ transactions", "Use 3+ dApps", "Active for 30+ days"]',
    '{"overview": "Scroll is a Layer 2 scaling solution built with zkEVM technology for Ethereum scalability.", "tokenomics": "SCR token distribution TBA", "roadmap": "Q3 2024: Token launch, Q4 2024: Mainnet optimization"}',
    false,
    false
),
(
    'airdrop_3',
    'MEXC',
    '/placeholder.svg?height=48&width=48&text=M',
    'Leading cryptocurrency exchange with global reach',
    'hottest',
    'confirmed',
    '$25-1000 MX',
    '2024-06-30',
    5432,
    4.7,
    892,
    'Easy',
    '{"telegram": "https://t.me/mexcofficial", "twitter": "https://twitter.com/mexc_official", "website": "https://mexc.com"}',
    '["Register new MEXC account", "Complete identity verification", "Make first deposit of $50+", "Complete 5 trades worth $100+ each", "Refer 2 friends to join"]',
    '["New users only", "Minimum $50 deposit", "Complete KYC Level 2", "Trade volume $500+"]',
    '{"overview": "MEXC is a leading cryptocurrency exchange providing secure and efficient trading services globally.", "tokenomics": "MX token serves as the native utility token for the MEXC ecosystem", "roadmap": "Continuous platform development and feature expansion"}',
    true,
    true
),
(
    'airdrop_4',
    'LayerZero',
    '/placeholder.svg?height=48&width=48&text=LZ',
    'Omnichain interoperability protocol connecting all blockchains',
    'potential',
    'upcoming',
    'TBA ZRO',
    '2024-09-15',
    8901,
    4.8,
    1247,
    'Hard',
    '{"telegram": "https://t.me/layerzeroprotocol", "twitter": "https://twitter.com/layerzero_labs", "website": "https://layerzero.network"}',
    '["Bridge assets between different chains", "Use LayerZero-powered dApps", "Provide liquidity on supported DEXs", "Complete cross-chain transactions", "Hold bridged assets for 60+ days"]',
    '["Multi-chain wallet setup", "Minimum $500 bridge volume", "Use 3+ different chains", "Active for 60+ days"]',
    '{"overview": "LayerZero is an omnichain interoperability protocol designed to connect all blockchains seamlessly.", "tokenomics": "ZRO token distribution and utility TBA", "roadmap": "Q4 2024: Token launch, 2025: Full omnichain deployment"}',
    false,
    false
),
(
    'airdrop_5',
    'Warden Protocol',
    '/placeholder.svg?height=48&width=48&text=W',
    'AI-powered crypto co-pilot for seamless DeFi interactions',
    'hottest',
    'active',
    '1000-5000 PUMPS',
    '2024-08-01',
    3240,
    4.5,
    324,
    'Easy',
    '{"telegram": "https://t.me/wardenprotocol", "twitter": "https://twitter.com/wardenprotocol", "website": "https://warden.xyz"}',
    '["Connect wallet to Warden Protocol", "Complete onboarding tutorial", "Perform 10 AI-assisted transactions", "Stake minimum 100 WARDEN tokens", "Use voice commands 5 times"]',
    '["Compatible wallet", "Minimum 100 WARDEN tokens", "Complete tutorial", "Active usage for 14 days"]',
    '{"overview": "Warden Protocol is an AI-powered crypto co-pilot that simplifies DeFi interactions through intelligent automation.", "tokenomics": "PUMPS token rewards for early adopters and active users", "roadmap": "Q3 2024: AI features expansion, Q4 2024: Mobile app launch"}',
    true,
    false
);

-- Insert Sample Analytics Data
INSERT INTO analytics (date, page_views, unique_visitors, clicks, conversions, revenue) VALUES
('2024-06-16', 8943, 2356, 1234, 234, 2456.78),
('2024-06-15', 7821, 2145, 1098, 198, 2234.56),
('2024-06-14', 9234, 2567, 1345, 267, 2678.90),
('2024-06-13', 8765, 2234, 1123, 223, 2345.67),
('2024-06-12', 7654, 2098, 987, 187, 2123.45),
('2024-06-11', 8432, 2187, 1076, 201, 2198.34),
('2024-06-10', 7890, 2034, 945, 178, 2087.65);

-- Insert Sample Traffic Sources
INSERT INTO traffic_sources (date, source, visitors, percentage) VALUES
('2024-06-16', 'Direct', 1254, 45.2),
('2024-06-16', 'Social Media', 897, 32.4),
('2024-06-16', 'Search Engines', 432, 15.6),
('2024-06-16', 'Referrals', 187, 6.8),
('2024-06-15', 'Direct', 1187, 44.8),
('2024-06-15', 'Social Media', 823, 31.9),
('2024-06-15', 'Search Engines', 398, 15.8),
('2024-06-15', 'Referrals', 201, 7.5);

-- Insert Sample User-Airdrop Participation
INSERT INTO user_airdrops (user_id, airdrop_id, joined_at, status, earnings) VALUES
('user_1', 'airdrop_1', '2024-06-15 10:30:00', 'completed', 250.00),
('user_1', 'airdrop_3', '2024-06-14 14:20:00', 'joined', 0.00),
('user_1', 'airdrop_5', '2024-06-13 16:45:00', 'completed', 150.00),
('user_2', 'airdrop_1', '2024-06-14 09:15:00', 'completed', 450.00),
('user_2', 'airdrop_2', '2024-06-13 16:45:00', 'joined', 0.00),
('user_2', 'airdrop_3', '2024-06-12 11:30:00', 'completed', 750.00),
('user_2', 'airdrop_5', '2024-06-11 08:20:00', 'completed', 300.00),
('user_5', 'airdrop_1', '2024-06-10 08:20:00', 'completed', 500.00),
('user_5', 'airdrop_2', '2024-06-09 13:45:00', 'completed', 1200.00),
('user_5', 'airdrop_3', '2024-06-08 15:30:00', 'completed', 1000.00),
('user_5', 'airdrop_4', '2024-06-07 10:15:00', 'joined', 0.00),
('user_5', 'airdrop_5', '2024-06-06 14:25:00', 'completed', 800.00);

-- Success message
SELECT 'Sample data inserted successfully!' as message;
SELECT 'Total users: ' || COUNT(*) as user_count FROM users;
SELECT 'Total airdrops: ' || COUNT(*) as airdrop_count FROM airdrops;
SELECT 'Total admin users: ' || COUNT(*) as admin_count FROM admin_users;
