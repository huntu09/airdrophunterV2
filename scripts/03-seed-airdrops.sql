-- Insert real airdrops data
INSERT INTO airdrops (
  name, slug, logo_url, description, about, status, website_url, 
  telegram_url, twitter_url, total_reward, participants_count, 
  deadline, is_hot, category, blockchain
) VALUES
(
  'LayerZero', 'layerzero', '/placeholder.svg?height=120&width=120',
  'Omnichain interoperability protocol enabling seamless cross-chain applications',
  'LayerZero is an omnichain interoperability protocol designed for lightweight message passing across chains. LayerZero provides authentic and guaranteed message delivery with configurable trustlessness. The protocol is implemented as a set of gas-efficient, non-upgradable smart contracts.',
  'CONFIRMED', 'https://layerzero.network',
  'https://t.me/layerzeroprotocol', 'https://twitter.com/layerzero_labs',
  '$ZRO Token', 150000, '2024-12-31 23:59:59', true, 'Layer 1', 'Ethereum'
),
(
  'Blast', 'blast', '/placeholder.svg?height=120&width=120',
  'The only Ethereum L2 with native yield for ETH and stablecoins',
  'Blast is the only Ethereum L2 with native yield for ETH and stablecoins. Blast raises the baseline yield for users and developers without changing the experience crypto users are familiar with. ETH deposited into Blast earns ~4% yield, and stablecoins earn ~5% yield.',
  'CONFIRMED', 'https://blast.io',
  'https://t.me/blast_l2', 'https://twitter.com/blast_l2',
  '$BLAST Token', 89000, '2024-12-25 23:59:59', true, 'Layer 2', 'Ethereum'
),
(
  'Eigenlayer', 'eigenlayer', '/placeholder.svg?height=120&width=120',
  'Restaking protocol that extends cryptoeconomic security',
  'EigenLayer is a protocol built on Ethereum that introduces restaking, a new primitive in cryptoeconomic security. This primitive enables the rehypothecation of ETH on the consensus layer. Users that stake ETH natively or with a liquid staking token can opt-in to EigenLayer smart contracts to restake their ETH and extend cryptoeconomic security to additional applications on the network.',
  'CONFIRMED', 'https://eigenlayer.xyz',
  'https://t.me/eigenlayer', 'https://twitter.com/eigenlayer',
  '$EIGEN Token', 67000, '2024-12-20 23:59:59', true, 'DeFi', 'Ethereum'
),
(
  'Zora', 'zora', '/placeholder.svg?height=120&width=120',
  'NFT marketplace and Layer 2 network for creators',
  'Zora is a decentralized protocol where anyone can permissionlessly buy, sell, and create NFTs. Zora Network is an Ethereum Layer 2 built with the OP Stack, designed for bringing NFTs onchain at scale.',
  'UPCOMING', 'https://zora.co',
  'https://t.me/zoraprotocol', 'https://twitter.com/zoradotco',
  '$ZORA Token', 45000, '2025-01-15 23:59:59', false, 'NFT', 'Ethereum'
),
(
  'Berachain', 'berachain', '/placeholder.svg?height=120&width=120',
  'EVM-compatible blockchain built on Proof-of-Liquidity consensus',
  'Berachain is a high-performance EVM-compatible blockchain built on Proof-of-Liquidity consensus. Berachain is built using the Cosmos SDK and leverages Tendermint for consensus, while using a novel Proof-of-Liquidity mechanism.',
  'UPCOMING', 'https://berachain.com',
  'https://t.me/berachainofficial', 'https://twitter.com/berachain',
  '$BERA Token', 78000, '2025-02-01 23:59:59', true, 'Layer 1', 'Cosmos'
),
(
  'Fuel Network', 'fuel-network', '/placeholder.svg?height=120&width=120',
  'Fastest modular execution layer for Ethereum',
  'Fuel is the fastest modular execution layer. Fuel delivers the highest security and flexible throughput, with a superior developer experience. Fuel is built from the ground up, with a novel architecture that combines the best of different blockchain technologies.',
  'UPCOMING', 'https://fuel.network',
  'https://t.me/fuelnetwork', 'https://twitter.com/fuel_network',
  '$FUEL Token', 92000, '2025-01-30 23:59:59', false, 'Layer 2', 'Ethereum'
)
ON CONFLICT (slug) DO NOTHING;
