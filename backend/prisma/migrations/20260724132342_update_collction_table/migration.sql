/*
  Warnings:

  - You are about to drop the column `name` on the `collections` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `collections` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `collections` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "collections_name_key";

-- AlterTable
ALTER TABLE "collections" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "collections_slug_key" ON "collections"("slug");
