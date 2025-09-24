-- CreateTable
CREATE TABLE "public"."P2PTransactions" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,

    CONSTRAINT "P2PTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "P2PTransactions_senderId_idx" ON "public"."P2PTransactions"("senderId");

-- CreateIndex
CREATE INDEX "P2PTransactions_receiverId_idx" ON "public"."P2PTransactions"("receiverId");

-- AddForeignKey
ALTER TABLE "public"."P2PTransactions" ADD CONSTRAINT "P2PTransactions_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."P2PTransactions" ADD CONSTRAINT "P2PTransactions_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
