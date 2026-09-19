CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`player_id` text NOT NULL,
	`password_hash` text NOT NULL,
	`can_edit` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_player_id_idx` ON `accounts` (`player_id`);--> statement-breakpoint
CREATE TABLE `caravan_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`coachman_player_id` text NOT NULL,
	`escort_player_id` text NOT NULL,
	`escort_role` text NOT NULL,
	`last_assigned_date` text NOT NULL,
	FOREIGN KEY (`coachman_player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`escort_player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `contribution_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`nick` text NOT NULL,
	`group` text NOT NULL,
	`points` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `elixir_race_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`nick` text NOT NULL,
	`level` integer NOT NULL,
	`team` text NOT NULL,
	`participation` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `formation_tiles` (
	`id` text PRIMARY KEY NOT NULL,
	`x` integer NOT NULL,
	`y` integer NOT NULL,
	`nick` text NOT NULL,
	`power` integer,
	`role` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `player_stats` (
	`id` text PRIMARY KEY NOT NULL,
	`nick` text NOT NULL,
	`avg_duel_score` integer NOT NULL,
	`avg_duel_rank` integer NOT NULL,
	`stronger_than_percent` integer NOT NULL,
	`weekly_power_change_percent` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` text PRIMARY KEY NOT NULL,
	`nick` text NOT NULL,
	`level` integer NOT NULL,
	`group` text NOT NULL,
	`total_power_m` real DEFAULT 0 NOT NULL,
	`playstyle` text NOT NULL,
	`coords_x` integer,
	`coords_y` integer,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rating_weeks` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`week_start` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rating_weeks_week_start_unique` ON `rating_weeks` (`week_start`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`expires_at` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `squads` (
	`id` text PRIMARY KEY NOT NULL,
	`player_id` text NOT NULL,
	`name` text NOT NULL,
	`power_m` real NOT NULL,
	`heroes` text NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `weekly_rating_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`week_id` text NOT NULL,
	`nick` text NOT NULL,
	`points` integer NOT NULL,
	FOREIGN KEY (`week_id`) REFERENCES `rating_weeks`(`id`) ON UPDATE no action ON DELETE cascade
);
