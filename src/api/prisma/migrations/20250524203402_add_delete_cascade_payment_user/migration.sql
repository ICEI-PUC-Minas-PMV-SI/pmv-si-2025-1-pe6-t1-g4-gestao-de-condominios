-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_userId_fkey`;

-- DropIndex
DROP INDEX `Payment_userId_fkey` ON `payment`;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
