DROP TABLE `oauth_account`;--> statement-breakpoint
/*
 SQLite does not support "Set not null to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE `user` ADD `password` text NOT NULL;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `email_verified`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `hashed_password`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `currency`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `avatar_url`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `role`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `created_at`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `updated_at`;