DROP INDEX "categories_name_unique";--> statement-breakpoint
DROP INDEX "categories_slug_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
DROP INDEX "technologies_name_unique";--> statement-breakpoint
DROP INDEX "technologies_slug_unique";--> statement-breakpoint
DROP INDEX "tags_name_unique";--> statement-breakpoint
DROP INDEX "tags_slug_unique";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "name" TO "name" text;--> statement-breakpoint
CREATE UNIQUE INDEX `categories_name_unique` ON `categories` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `technologies_name_unique` ON `technologies` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `technologies_slug_unique` ON `technologies` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `tags_name_unique` ON `tags` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `tags_slug_unique` ON `tags` (`slug`);