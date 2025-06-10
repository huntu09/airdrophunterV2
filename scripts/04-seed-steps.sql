-- Insert steps for LayerZero
INSERT INTO airdrop_steps (airdrop_id, step_number, title, description, is_required) 
SELECT id, 1, 'Bridge Assets', 'Use LayerZero-powered bridges like Stargate to bridge assets between different chains', true
FROM airdrops WHERE slug = 'layerzero';

INSERT INTO airdrop_steps (airdrop_id, step_number, title, description, is_required) 
SELECT id, 2, 'Use dApps', 'Interact with LayerZero-enabled applications across multiple chains', true
FROM airdrops WHERE slug = 'layerzero';

INSERT INTO airdrop_steps (airdrop_id, step_number, title, description, is_required) 
SELECT id, 3, 'Hold NFTs', 'Mint and hold LayerZero NFTs or use omnichain NFT protocols', false
FROM airdrops WHERE slug = 'layerzero';

-- Insert steps for Blast
INSERT INTO airdrop_steps (airdrop_id, step_number, title, description, is_required) 
SELECT id, 1, 'Bridge to Blast', 'Bridge ETH or stablecoins to Blast L2 network', true
FROM airdrops WHERE slug = 'blast';

INSERT INTO airdrop_steps (airdrop_id, step_number, title, description, is_required) 
SELECT id, 2, 'Earn Yield', 'Keep your assets on Blast to earn native yield automatically', true
FROM airdrops WHERE slug = 'blast';

INSERT INTO airdrop_steps (airdrop_id, step_number, title, description, is_required) 
SELECT id, 3, 'Use Blast dApps', 'Interact with native Blast applications and protocols', true
FROM airdrops WHERE slug = 'blast';

-- Insert steps for Eigenlayer
INSERT INTO airdrop_steps (airdrop_id, step_number, title, description, is_required) 
SELECT id, 1, 'Stake ETH', 'Stake ETH through liquid staking protocols like Lido or Rocket Pool', true
FROM airdrops WHERE slug = 'eigenlayer';

INSERT INTO airdrop_steps (airdrop_id, step_number, title, description, is_required) 
SELECT id, 2, 'Restake on EigenLayer', 'Restake your LST tokens on EigenLayer protocol', true
FROM airdrops WHERE slug = 'eigenlayer';

INSERT INTO airdrop_steps (airdrop_id, step_number, title, description, is_required) 
SELECT id, 3, 'Choose Operators', 'Delegate to EigenLayer operators to secure AVS networks', true
FROM airdrops WHERE slug = 'eigenlayer';
