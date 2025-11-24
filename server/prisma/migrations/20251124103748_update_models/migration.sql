/*
  Warnings:

  - You are about to drop the `MovieTranslators` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `download` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `translatorId` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `Translators` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MovieType" AS ENUM ('Series', 'Movie');

-- DropForeignKey
ALTER TABLE "MovieTranslators" DROP CONSTRAINT "MovieTranslators_movie_id_fkey";

-- DropForeignKey
ALTER TABLE "MovieTranslators" DROP CONSTRAINT "MovieTranslators_translator_id_fkey";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "download" INTEGER NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "translatorId" INTEGER NOT NULL,
ADD COLUMN     "type" "MovieType" NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Translators" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "MovieTranslators";

-- DropEnum
DROP TYPE "TranslatorName";

-- CreateTable
CREATE TABLE "Visitors" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "newVisitor" INTEGER NOT NULL,
    "pageViews" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_slug_key" ON "Movie"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Translators_name_key" ON "Translators"("name");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_translatorId_fkey" FOREIGN KEY ("translatorId") REFERENCES "Translators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
