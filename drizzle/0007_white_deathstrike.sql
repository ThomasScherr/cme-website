CREATE TABLE `not_found_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`path` varchar(2048) NOT NULL,
	`referrer` text,
	`userAgent` text,
	`ip` varchar(45),
	`hitCount` int NOT NULL DEFAULT 1,
	`firstSeenAt` timestamp NOT NULL DEFAULT (now()),
	`lastSeenAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `not_found_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `redirects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sourcePath` varchar(2048) NOT NULL,
	`targetUrl` varchar(2048) NOT NULL,
	`statusCode` int NOT NULL DEFAULT 301,
	`isActive` boolean NOT NULL DEFAULT true,
	`hitCount` int NOT NULL DEFAULT 0,
	`note` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `redirects_id` PRIMARY KEY(`id`)
);
