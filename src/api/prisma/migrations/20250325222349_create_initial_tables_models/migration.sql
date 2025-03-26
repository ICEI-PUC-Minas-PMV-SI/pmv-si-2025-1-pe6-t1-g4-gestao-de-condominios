-- AlterTable
ALTER TABLE `User` ADD COLUMN `condominiumId` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Condominium` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Apartment` (
    `id` VARCHAR(191) NOT NULL,
    `block` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `floor` INTEGER NOT NULL,
    `condominiumId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserApartment` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `apartmentId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommonArea` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('PARKING', 'BARBECUE', 'COURT', 'PARTY_ROOM', 'OTHER') NOT NULL,
    `quantity` INTEGER NOT NULL,
    `condominiumId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommonAreaReservation` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `commonAreaId` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fee` (
    `id` VARCHAR(191) NOT NULL,
    `apartmentId` VARCHAR(191) NOT NULL,
    `type` ENUM('RENT', 'CONDOMINIUM') NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeePayment` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `feeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Apartment` ADD CONSTRAINT `Apartment_condominiumId_fkey` FOREIGN KEY (`condominiumId`) REFERENCES `Condominium`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_condominiumId_fkey` FOREIGN KEY (`condominiumId`) REFERENCES `Condominium`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserApartment` ADD CONSTRAINT `UserApartment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserApartment` ADD CONSTRAINT `UserApartment_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `Apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommonArea` ADD CONSTRAINT `CommonArea_condominiumId_fkey` FOREIGN KEY (`condominiumId`) REFERENCES `Condominium`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommonAreaReservation` ADD CONSTRAINT `CommonAreaReservation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommonAreaReservation` ADD CONSTRAINT `CommonAreaReservation_commonAreaId_fkey` FOREIGN KEY (`commonAreaId`) REFERENCES `CommonArea`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fee` ADD CONSTRAINT `Fee_apartmentId_fkey` FOREIGN KEY (`apartmentId`) REFERENCES `Apartment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeePayment` ADD CONSTRAINT `FeePayment_feeId_fkey` FOREIGN KEY (`feeId`) REFERENCES `Fee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
