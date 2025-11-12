-- CreateTable
CREATE TABLE `SiteSetting` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `siteName` VARCHAR(191) NOT NULL,
    `siteLogoUrl` VARCHAR(191) NOT NULL,
    `heroTitle` VARCHAR(191) NOT NULL,
    `heroSubtitle` VARCHAR(191) NOT NULL,
    `metaDescription` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
