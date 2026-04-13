CREATE TABLE `nda_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`salutation` varchar(50) NOT NULL,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`company` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`topic` varchar(500),
	`source` varchar(100),
	`webhookSent` boolean NOT NULL DEFAULT false,
	`isProcessed` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `nda_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `contact_submissions` ADD `salutation` varchar(50);--> statement-breakpoint
ALTER TABLE `contact_submissions` ADD `title` varchar(100);