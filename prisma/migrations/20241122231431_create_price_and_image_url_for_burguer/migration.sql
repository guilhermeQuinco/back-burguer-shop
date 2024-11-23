/*
  Warnings:

  - The primary key for the `Burguer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Burguer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `image_url` to the `Burguer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Burguer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Burguer" DROP CONSTRAINT "Burguer_pkey",
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Burguer_pkey" PRIMARY KEY ("id");
