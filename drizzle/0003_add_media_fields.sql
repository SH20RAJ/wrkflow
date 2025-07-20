-- Add media fields to workflows table
ALTER TABLE workflows ADD COLUMN youtube_url text;
ALTER TABLE workflows ADD COLUMN poster_image text;
ALTER TABLE workflows ADD COLUMN screenshots text; -- JSON array of screenshot URLs
ALTER TABLE workflows ADD COLUMN demo_images text; -- JSON array of demo image URLs