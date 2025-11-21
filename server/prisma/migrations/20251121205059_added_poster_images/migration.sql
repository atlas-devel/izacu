/*
  Warnings:

  - You are about to drop the column `landscapeUrl` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `posterUrl` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `posterLandscape` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterPotrait` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "landscapeUrl",
DROP COLUMN "posterUrl",
ADD COLUMN     "posterLandscape" TEXT NOT NULL,
ADD COLUMN     "posterPotrait" TEXT NOT NULL;
