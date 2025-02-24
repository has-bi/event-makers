-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "image" TEXT;

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
