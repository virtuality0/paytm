"use server";
import { getCurrentUserMetadata } from "@/helpers/getCurrentUserMetadata";
import db from "@repo/db/client";

export async function getBalance() {
  const userId = (await getCurrentUserMetadata()) ?? "";
  try {
    const balance = await db.balance.findFirst({
      where: {
        userId: userId,
      },
      select: {
        amount: true,
        locked: true,
        id: true,
      },
    });

    return {
      success: true,
      data: balance,
    };
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
}
