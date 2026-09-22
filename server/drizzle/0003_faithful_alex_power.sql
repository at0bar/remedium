CREATE UNIQUE INDEX `contribution_entries_nick_week_idx` ON `contribution_entries` (`nick`,`week_start`);--> statement-breakpoint
ALTER TABLE `contribution_entries` DROP COLUMN `group`;