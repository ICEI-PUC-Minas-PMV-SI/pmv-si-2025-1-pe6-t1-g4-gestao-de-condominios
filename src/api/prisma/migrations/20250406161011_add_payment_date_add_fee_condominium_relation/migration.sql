/*
  Warnings:

  - Added the required column `condominiumId` to the `Fee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condominiumId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentDate` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Fee` ADD COLUMN `condominiumId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `payment` ADD COLUMN `condominiumId` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentDate` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Fee` ADD CONSTRAINT `Fee_condominiumId_fkey` FOREIGN KEY (`condominiumId`) REFERENCES `Condominium`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_condominiumId_fkey` FOREIGN KEY (`condominiumId`) REFERENCES `Condominium`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
