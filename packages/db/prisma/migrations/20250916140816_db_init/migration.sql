-- CreateEnum
CREATE TYPE "public"."OnRampStatus" AS ENUM ('Success', 'Failed', 'Processing');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "number" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Balance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "locked" INTEGER NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OnRampTransactions" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "public"."OnRampStatus" NOT NULL,
    "token" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnRampTransactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "public"."User"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_userId_key" ON "public"."Balance"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransactions_token_key" ON "public"."OnRampTransactions"("token");

-- AddForeignKey
ALTER TABLE "public"."Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OnRampTransactions" ADD CONSTRAINT "OnRampTransactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
