/*
  Warnings:

  - You are about to drop the column `salutation` on the `user` table. All the data in the column will be lost.
  - Added the required column `namePrefix` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `salutation`,
    ADD COLUMN `namePrefix` VARCHAR(5) NOT NULL;
