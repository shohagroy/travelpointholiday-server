/*
  Warnings:

  - You are about to drop the column `c_id` on the `avatars` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `avatars` table. All the data in the column will be lost.
  - You are about to drop the column `c_id` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `images` table. All the data in the column will be lost.
  - Added the required column `public_id` to the `avatars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secure_url` to the `avatars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secure_url` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "avatars" DROP COLUMN "c_id",
DROP COLUMN "url",
ADD COLUMN     "public_id" TEXT NOT NULL,
ADD COLUMN     "secure_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "images" DROP COLUMN "c_id",
DROP COLUMN "url",
ADD COLUMN     "public_id" TEXT NOT NULL,
ADD COLUMN     "secure_url" TEXT NOT NULL;
