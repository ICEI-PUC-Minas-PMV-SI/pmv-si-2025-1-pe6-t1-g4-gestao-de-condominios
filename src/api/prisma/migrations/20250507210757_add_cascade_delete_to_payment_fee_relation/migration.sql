-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_feeId_fkey`;

-- DropIndex
DROP INDEX `Payment_feeId_fkey` ON `Payment`;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_feeId_fkey` FOREIGN KEY (`feeId`) REFERENCES `Fee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
