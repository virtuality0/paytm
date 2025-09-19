-- DropForeignKey
ALTER TABLE "public"."Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OnRampTransactions" DROP CONSTRAINT "OnRampTransactions_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OnRampTransactions" ADD CONSTRAINT "OnRampTransactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
