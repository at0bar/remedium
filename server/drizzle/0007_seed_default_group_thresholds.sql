-- Seed "Порог группы" defaults (see ADR 0006) with the values that were previously hardcoded
-- in ContributionScale.tsx, so behavior doesn't regress before an officer edits them.
INSERT INTO `settings` (`key`, `value`) VALUES ('groupThresholdR1R2', '8000000');
--> statement-breakpoint
INSERT INTO `settings` (`key`, `value`) VALUES ('groupThresholdR2R3', '30000000');
