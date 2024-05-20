/*
  Warnings:

  - You are about to alter the column `prefix` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `nationality` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - You are about to alter the column `phone_code` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `prefix` VARCHAR(191) NOT NULL,
    MODIFY `nationality` VARCHAR(191) NOT NULL,
    MODIFY `phone_code` VARCHAR(191) NOT NULL;
