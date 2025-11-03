/*
  Warnings:

  - Added the required column `amout` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `amout` VARCHAR(191) NOT NULL;
