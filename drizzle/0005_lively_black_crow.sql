CREATE TABLE `media_library` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` text NOT NULL,
	`filename` varchar(500) NOT NULL,
	`mimeType` varchar(100) NOT NULL,
	`fileSize` int NOT NULL DEFAULT 0,
	`tags` text,
	`altText` varchar(500),
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_library_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contentKey` varchar(255) NOT NULL,
	`contentType` enum('text','richtext','image','video') NOT NULL,
	`valueDe` text,
	`valueEn` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_content_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_content_contentKey_unique` UNIQUE(`contentKey`)
);
