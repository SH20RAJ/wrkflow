-- Add new columns to workflows table
ALTER TABLE `workflows` ADD `is_private` integer DEFAULT 0 NOT NULL;
ALTER TABLE `workflows` ADD `tags` text;
ALTER TABLE `workflows` ADD `category_id` text REFERENCES categories(id);

-- Create collections table
CREATE TABLE `collections` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`user_id` text NOT NULL,
	`is_private` integer DEFAULT 0 NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

-- Create collection_workflows junction table
CREATE TABLE `collection_workflows` (
	`id` text PRIMARY KEY NOT NULL,
	`collection_id` text NOT NULL,
	`workflow_id` text NOT NULL,
	`added_at` integer,
	FOREIGN KEY (`collection_id`) REFERENCES `collections`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`workflow_id`) REFERENCES `workflows`(`id`) ON UPDATE no action ON DELETE no action
);

-- Create saved_workflows table
CREATE TABLE `saved_workflows` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`workflow_id` text NOT NULL,
	`saved_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`workflow_id`) REFERENCES `workflows`(`id`) ON UPDATE no action ON DELETE no action
);