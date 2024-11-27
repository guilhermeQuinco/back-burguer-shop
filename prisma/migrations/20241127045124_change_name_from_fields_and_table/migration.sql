/*
  Warnings:

  - You are about to drop the column `burguerId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the `Burguer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itemId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_burguerId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "burguerId",
ADD COLUMN     "itemId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Burguer";

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
