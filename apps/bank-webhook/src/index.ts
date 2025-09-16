import express, { Request, Response } from "express";
import db from "@repo/db/client";

const app = express();

// app.post("/hdfcWebhook", async (req: Request, res: Response) => {
//   // zod validation
//   // check if request actually came from hdfcbank
//   const paymentInformation = {
//     amount: req.body.amount,
//     userId: req.body.user_identifier,
//     token: req.body.token,
//   };
//
//   try {
//     await db.$transaction([
//       db.balance.update({
//         where: {
//           userId: paymentInformation.userId,
//         },
//         data: {
//           amount: {
//             increment: Number(paymentInformation.amount),
//           },
//         },
//       }),
//
//       db.onRampTransactions.update({
//         where: {
//           token: paymentInformation.token,
//         },
//         data: {
//           status: "Success",
//         },
//       }),
//     ]);
//
//     res.status(200).json({
//       message: "Captured",
//     });
//   } catch (err) {
//     res.status(411).json({
//       message: "Error processing webhook request.",
//     });
//   }
// });
