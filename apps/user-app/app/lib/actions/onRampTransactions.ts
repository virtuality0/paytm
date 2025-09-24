"use server";
import { getCurrentUserMetadata } from "@/helpers/getCurrentUserMetadata";
import db from "@repo/db/client";

export async function CreateOnRampTransactions(
  amount: number,
  provider: string,
) {
  try {
    const userId = (await getCurrentUserMetadata()) ?? "";
    console.log("userid ", userId);

    if (!userId) {
      return {
        message: "Not authorized.",
      };
    }

    // In real world, this will come from a bank api eg.
    // await axios.get('hdfcbank.com/token')
    const token = Math.random().toString();

    await db.onRampTransactions.create({
      data: {
        userId: userId,
        amount: amount,
        status: "Processing",
        provider: provider,
        startTime: new Date(),
        token: token,
      },
    });

    return {
      success: true,
      message: "Transaction created successfully.",
    };
  } catch (err) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function getOnRampTransactions() {
  const userId = await getCurrentUserMetadata();

  if (!userId) {
    return ({
      success: false,
      message: "Not authorized",
    });
  }

  try {
    const transactions = await db.onRampTransactions.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        amount: true,
        provider: true,
        startTime: true,
      },
      orderBy: {
        startTime: "desc",
      },
    });

    return ({
      success: true,
      data: transactions,
    });
  } catch (err) {
    return ({
      success: false,
      message: "Something went wrong!",
    });
}
}