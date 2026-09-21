-- "Стиль игры" unification (see ADR 0005) — players.playstyle moves from the old 3-value
-- Cyrillic set to the 4-value set formerly only used by formation_tiles.role.
UPDATE `players` SET `playstyle` = 'attacker' WHERE `playstyle` = 'Фарм';
--> statement-breakpoint
UPDATE `players` SET `playstyle` = 'defender' WHERE `playstyle` = 'Оборона';
--> statement-breakpoint
UPDATE `players` SET `playstyle` = 'mixed' WHERE `playstyle` = 'Смешанный';
