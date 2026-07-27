/*
  Warnings:

  - You are about to drop the `collection_product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `collections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "collection_product" DROP CONSTRAINT "collection_product_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "collection_product" DROP CONSTRAINT "collection_product_product_id_fkey";

-- DropTable
DROP TABLE "collection_product";

-- DropTable
DROP TABLE "collections";
