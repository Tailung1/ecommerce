/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "category_product" DROP CONSTRAINT "category_product_category_id_fkey";

-- DropTable
DROP TABLE "categories";

-- CreateTable
CREATE TABLE "categoriess" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "categoriess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categoriess_slug_key" ON "categoriess"("slug");

-- AddForeignKey
ALTER TABLE "category_product" ADD CONSTRAINT "category_product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categoriess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
