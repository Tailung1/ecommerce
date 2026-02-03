-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255),
    "price" INTEGER,
    "stock" INTEGER,

    CONSTRAINT "untitled_table_pkey" PRIMARY KEY ("id")
);
