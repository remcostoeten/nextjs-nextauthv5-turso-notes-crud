CREATE TABLE `user_profile` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`first_name` text,
	`last_name` text,
	`bio` text,
	`date_of_birth` text,
	`address` text,
	`language` text DEFAULT 'en',
	`app_theme` text DEFAULT 'system',
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
