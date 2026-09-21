CREATE TABLE `power_snapshot_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`snapshot_id` text NOT NULL,
	`player_id` text NOT NULL,
	`power_m` real NOT NULL,
	FOREIGN KEY (`snapshot_id`) REFERENCES `power_snapshots`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `power_snapshots` (
	`id` text PRIMARY KEY NOT NULL,
	`taken_at` text DEFAULT (current_timestamp) NOT NULL
);
