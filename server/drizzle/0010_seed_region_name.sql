-- Seed the region name (see ADR 0006) into the same `settings` key-value store — replaces the
-- copy hardcoded in OverviewTab.tsx and CoordinateFormationGrid.tsx.
INSERT INTO `settings` (`key`, `value`) VALUES ('regionName', 'Небесная крепость');
