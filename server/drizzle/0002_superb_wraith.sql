DROP TABLE `player_stats`;--> statement-breakpoint
DROP TABLE `rating_weeks`;--> statement-breakpoint
DROP TABLE `weekly_rating_entries`;--> statement-breakpoint
ALTER TABLE `contribution_entries` ADD `week_start` text NOT NULL;