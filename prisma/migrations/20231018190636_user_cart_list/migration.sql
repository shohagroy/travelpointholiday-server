/*
  Warnings:

  - You are about to drop the column `discount` on the `user_carts` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `user_carts` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user_carts` table. All the data in the column will be lost.
  - Added the required column `image` to the `user_carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `user_carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tittle` to the `user_carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_carts" DROP COLUMN "discount",
DROP COLUMN "payment",
DROP COLUMN "status",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tittle" TEXT NOT NULL,
ALTER COLUMN "totalTicket" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "user_carts" ADD CONSTRAINT "user_carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_carts" ADD CONSTRAINT "user_carts_attractionId_fkey" FOREIGN KEY ("attractionId") REFERENCES "attractions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
