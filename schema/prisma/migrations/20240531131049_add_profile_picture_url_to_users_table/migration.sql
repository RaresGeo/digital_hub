/*
  Warnings:

  - You are about to drop the column `lastLoggedIn` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `registeredAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "lastLoggedIn",
DROP COLUMN "registeredAt",
ADD COLUMN     "last_logged_in" TIMESTAMP(3),
ADD COLUMN     "profile_picture_url" TEXT,
ADD COLUMN     "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
