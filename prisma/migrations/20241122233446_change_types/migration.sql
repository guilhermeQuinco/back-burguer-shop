/*
  Warnings:

  - You are about to drop the column `image_url` on the `Burguer` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Burguer` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Burguer" DROP COLUMN "image_url",
ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
