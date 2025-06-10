-- Create admin user (password: admin123)
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('admin@airdrophunter.com', '$2b$10$rQZ9vKzqzQzqzQzqzQzqzOeKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;
