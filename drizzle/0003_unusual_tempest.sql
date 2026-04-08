CREATE TABLE `site_styles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`styles` text NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_styles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `style_presets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`styles` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `style_presets_id` PRIMARY KEY(`id`)
);
