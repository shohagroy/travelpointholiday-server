-- CreateTable
CREATE TABLE "banar" (
    "id" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "secure_url" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "banar_pkey" PRIMARY KEY ("id")
);
