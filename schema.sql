-- Drop tables if they exist
DROP TABLE IF EXISTS workflows_to_technologies;
DROP TABLE IF EXISTS workflows_to_categories;
DROP TABLE IF EXISTS workflows;
DROP TABLE IF EXISTS technologies;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    avatar TEXT,
    bio TEXT,
    created_at INTEGER,
    updated_at INTEGER
);

-- Create categories table
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    created_at INTEGER,
    updated_at INTEGER
);

-- Create technologies table
CREATE TABLE technologies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    created_at INTEGER,
    updated_at INTEGER
);

-- Create workflows table
CREATE TABLE workflows (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id TEXT NOT NULL,
    category_id TEXT,
    slug TEXT NOT NULL UNIQUE,
    is_published INTEGER DEFAULT 0,
    is_featured INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    youtube_url TEXT,
    poster_image TEXT,
    screenshot_urls TEXT,
    demo_image_urls TEXT,
    created_at INTEGER,
    updated_at INTEGER,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Create junction table for workflows and categories (many-to-many)
CREATE TABLE workflows_to_categories (
    id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL,
    category_id TEXT NOT NULL,
    FOREIGN KEY (workflow_id) REFERENCES workflows(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Create junction table for workflows and technologies (many-to-many)
CREATE TABLE workflows_to_technologies (
    id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL,
    technology_id TEXT NOT NULL,
    FOREIGN KEY (workflow_id) REFERENCES workflows(id) ON DELETE CASCADE,
    FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_workflows_author_id ON workflows(author_id);
CREATE INDEX idx_workflows_category_id ON workflows(category_id);
CREATE INDEX idx_workflows_slug ON workflows(slug);
CREATE INDEX idx_workflows_is_published ON workflows(is_published);
CREATE INDEX idx_workflows_is_featured ON workflows(is_featured);
CREATE INDEX idx_workflows_created_at ON workflows(created_at);

CREATE INDEX idx_workflows_to_categories_workflow_id ON workflows_to_categories(workflow_id);
CREATE INDEX idx_workflows_to_categories_category_id ON workflows_to_categories(category_id);

CREATE INDEX idx_workflows_to_technologies_workflow_id ON workflows_to_technologies(workflow_id);
CREATE INDEX idx_workflows_to_technologies_technology_id ON workflows_to_technologies(technology_id);

-- Insert sample data
INSERT INTO categories (id, name, description, slug, icon, created_at, updated_at) VALUES 
('cat-automation', 'Automation', 'Workflow automation templates', 'automation', '🤖', strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000),
('cat-data', 'Data Processing', 'Data processing and analysis workflows', 'data-processing', '📊', strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000),
('cat-marketing', 'Marketing', 'Marketing automation workflows', 'marketing', '📈', strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000),
('cat-ecommerce', 'E-commerce', 'E-commerce automation workflows', 'ecommerce', '🛒', strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000);

INSERT INTO technologies (id, name, description, slug, icon, created_at, updated_at) VALUES 
('tech-webhook', 'Webhook', 'HTTP webhooks for integration', 'webhook', '🔗', strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000),
('tech-email', 'Email', 'Email automation and notifications', 'email', '📧', strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000),
('tech-database', 'Database', 'Database operations and queries', 'database', '🗄️', strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000),
('tech-api', 'API', 'REST API integrations', 'api', '🔌', strftime('%s', 'now') * 1000, strftime('%s', 'now') * 1000);
