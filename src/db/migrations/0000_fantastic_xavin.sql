CREATE TABLE `config` (
	`key` text NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `config_key_unique` ON `config` (`key`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`formID` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_formID_unique` ON `user` (`formID`);