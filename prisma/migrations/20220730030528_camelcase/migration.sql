/*
  Warnings:

  - You are about to drop the column `direction_is_sell` on the `Trade` table. All the data in the column will be lost.
  - Added the required column `directionIsSell` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "direction_is_sell",
ADD COLUMN     "directionIsSell" BOOLEAN NOT NULL;
