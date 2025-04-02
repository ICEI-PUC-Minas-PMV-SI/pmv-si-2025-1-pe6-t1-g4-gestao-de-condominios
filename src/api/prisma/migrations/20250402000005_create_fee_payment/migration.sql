-- CreateTable
CREATE TABLE `Fee` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('RENT', 'CONDOMINIUM', 'OTHER') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `due` DATETIME(3) NOT NULL,
    `isRecurrent` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `feeId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `apartmentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_feeId_fkey` FOREIGN KEY (`feeId`) REFERENCES `Fee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `Apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
