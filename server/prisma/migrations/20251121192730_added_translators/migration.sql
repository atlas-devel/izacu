/*
  Warnings:

  - Made the column `landscapeUrl` on table `Movie` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TranslatorName" AS ENUM ('Rocky', 'Savimbi', 'Junior', 'Sankara', 'Gaheza');

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "landscapeUrl" SET NOT NULL;

-- CreateTable
CREATE TABLE "Translators" (
    "id" SERIAL NOT NULL,
    "name" "TranslatorName" NOT NULL,

    CONSTRAINT "Translators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieTranslators" (
    "movie_id" INTEGER NOT NULL,
    "translator_id" INTEGER NOT NULL,

    CONSTRAINT "MovieTranslators_pkey" PRIMARY KEY ("movie_id","translator_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Translators_name_key" ON "Translators"("name");

-- AddForeignKey
ALTER TABLE "MovieTranslators" ADD CONSTRAINT "MovieTranslators_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieTranslators" ADD CONSTRAINT "MovieTranslators_translator_id_fkey" FOREIGN KEY ("translator_id") REFERENCES "Translators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
