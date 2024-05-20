/*
  Warnings:

  - You are about to alter the column `prefix` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(5)`.
  - You are about to alter the column `citizenId` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `phone_code` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `phone_number` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `expect_salary` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - A unique constraint covering the columns `[citizenId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `prefix` VARCHAR(5) NOT NULL,
    MODIFY `citizenId` VARCHAR(20) NOT NULL,
    MODIFY `phone_code` VARCHAR(10) NOT NULL,
    MODIFY `phone_number` VARCHAR(20) NOT NULL,
    MODIFY `expect_salary` DECIMAL(10, 2) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_citizenId_key` ON `user`(`citizenId`);
