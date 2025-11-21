/*
  Warnings:

  - Added the required column `sr_no` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `sr_no` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`sr_no`);
