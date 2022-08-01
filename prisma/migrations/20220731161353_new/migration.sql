/*
  Warnings:

  - You are about to drop the column `directionIsSell` on the `trades` table. All the data in the column will be lost.
  - Added the required column `direction` to the `trades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trades" DROP COLUMN "directionIsSell",
ADD COLUMN     "direction" TEXT NOT NULL;
