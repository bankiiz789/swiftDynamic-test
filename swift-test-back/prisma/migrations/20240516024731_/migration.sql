-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prefix` ENUM('Mr', 'Mrs', 'Ms') NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,
    `nationality` ENUM('Thai', 'Chiese', 'Japanese') NOT NULL,
    `citizenId` VARCHAR(191) NOT NULL,
    `phone_code` ENUM('TH', 'USA', 'ENG', 'CH', 'JP', 'Korea') NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `passport` VARCHAR(191) NULL,
    `expect_salary` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
