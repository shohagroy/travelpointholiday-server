-- AlterTable
ALTER TABLE "attractions" ADD COLUMN     "bookingSeat" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalSeat" INTEGER NOT NULL DEFAULT 72;

-- CreateTable
CREATE TABLE "attraction_booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "attractionid" TEXT NOT NULL,
    "totalTicket" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'booked',
    "payment" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "attraction_booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attraction_booking" ADD CONSTRAINT "attraction_booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attraction_booking" ADD CONSTRAINT "attraction_booking_attractionid_fkey" FOREIGN KEY ("attractionid") REFERENCES "attractions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
