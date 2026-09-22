-- Seed alliance name / server number (see ADR 0006) into the same generic `settings`
-- key-value store as the "Порог группы" values, replacing the copies hardcoded in
-- Sidebar.tsx, AlliancePage.tsx and ServerPage.tsx (which also disagreed with each other).
INSERT INTO `settings` (`key`, `value`) VALUES ('allianceName', '[IRON] ЦАРСТВО');
--> statement-breakpoint
INSERT INTO `settings` (`key`, `value`) VALUES ('serverNumber', '337');
