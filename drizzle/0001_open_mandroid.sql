CREATE TABLE `design_presets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`isDefault` tinyint NOT NULL DEFAULT 0,
	`responsiveConfig` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `design_presets_id` PRIMARY KEY(`id`)
);
