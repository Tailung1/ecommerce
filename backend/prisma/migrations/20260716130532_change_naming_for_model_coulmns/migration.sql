/*
  Warnings:

  - You are about to drop the column `createdAt` on the `password_reset_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `password_reset_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `otpHash` on the `password_reset_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `password_reset_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `otpCode` on the `users` table. All the data in the column will be lost.
  - Added the required column `expires_at` to the `password_reset_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otp_hash` to the `password_reset_sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `password_reset_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "password_reset_sessions" DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "otpHash",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "otp_hash" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "otpCode",
ADD COLUMN     "otp_code" VARCHAR(255);
