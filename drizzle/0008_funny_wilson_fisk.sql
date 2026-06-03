CREATE TABLE `authors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`titleDe` varchar(500),
	`titleEn` varchar(500),
	`bioDe` text,
	`bioEn` text,
	`expertiseDe` text,
	`expertiseEn` text,
	`imageUrl` text,
	`url` varchar(500),
	`company` varchar(255),
	`companyUrl` varchar(500),
	`location` varchar(255),
	`knowsAbout` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `authors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `articles` ADD `authorId` int;