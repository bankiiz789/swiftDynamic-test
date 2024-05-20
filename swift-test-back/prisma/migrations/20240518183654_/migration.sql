/*
  Warnings:

  - You are about to drop the column `prefix` on the `user` table. All the data in the column will be lost.
  - Added the required column `salutation` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `prefix`,
    ADD COLUMN `salutation` VARCHAR(5) NOT NULL;
