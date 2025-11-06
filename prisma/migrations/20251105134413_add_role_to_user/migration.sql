/*
  Warnings:

  - Added the required column `sr_no` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `sr_no` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`sr_no`);
