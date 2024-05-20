/*
  Warnings:

  - You are about to drop the column `namePrefix` on the `user` table. All the data in the column will be lost.
  - Added the required column `PrefixName` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `namePrefix`,
    ADD COLUMN `PrefixName` VARCHAR(5) NOT NULL;
