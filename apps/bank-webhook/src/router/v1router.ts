import { Router } from "express";
import { db } from "../db";

export const RouterV1: Router = Router();

RouterV1.post("/hdfcWebhook", async (req, res) => {
  // zod validation
  // check if request actually came from hdfcbank
  const paymentInformation = {
    amount: req.body.amount,
    userId: req.body.userId,
    token: req.body.token,
  };

  try {
    await db.$transaction([
      db.balance.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),

      db.onRampTransactions.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.status(200).json({
      message: "Captured",
    });
  } catch (err) {
    res.status(411).json({
      message: "Error processing webhook request.",
      error: err,
    });
  }
});
