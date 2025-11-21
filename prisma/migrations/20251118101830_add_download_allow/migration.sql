/*
  Warnings:

  - Added the required column `business_address` to the `SiteSetting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sitesetting` ADD COLUMN `business_address` VARCHAR(191) NOT NULL,
    ADD COLUMN `contact_email` VARCHAR(191) NULL,
    ADD COLUMN `contact_number` VARCHAR(191) NULL;
