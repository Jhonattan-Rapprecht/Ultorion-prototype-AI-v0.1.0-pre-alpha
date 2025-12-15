USE ulterion;

-- Insert roles
INSERT INTO roles (name, description)
VALUES 
  ('admin', 'Full access to all modules'),
  ('manager', 'Can manage contracts and entities'),
  ('viewer', 'Read-only access');

-- Insert permissions
INSERT INTO permissions (name, description)
VALUES
  ('contracts.read', 'View contracts'),
  ('contracts.write', 'Create and update contracts'),
  ('contracts.delete', 'Delete contracts'),
  ('entities.read', 'View entities'),
  ('entities.write', 'Create and update entities'),
  ('entities.delete', 'Delete entities');

-- Link permissions to roles
-- Admin gets everything
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.role_id, p.permission_id
FROM roles r
JOIN permissions p
WHERE r.name = 'admin';

-- Manager gets read/write but not delete
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.role_id, p.permission_id
FROM roles r
JOIN permissions p
WHERE r.name = 'manager'
  AND p.name IN ('contracts.read','contracts.write','entities.read','entities.write');

-- Viewer gets only read
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.role_id, p.permission_id
FROM roles r
JOIN permissions p
WHERE r.name = 'viewer'
  AND p.name LIKE '%.read';

-- Insert a test user
INSERT INTO users (username, email, password_hash)
VALUES ('admin_user', 'admin@ulterion.com', 'hashed_password_here');

-- Assign admin role to test user
INSERT INTO user_roles (user_id, role_id)
SELECT u.user_id, r.role_id
FROM users u, roles r
WHERE u.username = 'admin_user' AND r.name = 'admin';
