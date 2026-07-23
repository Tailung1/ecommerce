/*
  Warnings:

  - You are about to drop the `collection_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "collection_products" DROP CONSTRAINT "collection_products_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "collection_products" DROP CONSTRAINT "collection_products_product_id_fkey";

-- DropTable
DROP TABLE "collection_products";

-- CreateTable
CREATE TABLE "collection_product" (
    "id" SERIAL NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "collection_product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collection_product_collection_id_product_id_key" ON "collection_product"("collection_id", "product_id");

-- AddForeignKey
ALTER TABLE "collection_product" ADD CONSTRAINT "collection_product_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection_product" ADD CONSTRAINT "collection_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
