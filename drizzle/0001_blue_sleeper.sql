ALTER TABLE `workflows` ADD `slug` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `workflows_slug_unique` ON `workflows` (`slug`);