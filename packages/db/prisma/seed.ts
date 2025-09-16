import db from "../src/index";
import bcrypt from "bcrypt";

async function main() {
  await db.user.upsert({
    where: {
      email: "alice@gmail.com",
    },
    create: {
      firstName: "alice",
      email: "alice@gmail.com",
      password: await bcrypt.hash("alice123", 10),
      balance: {
        create: {
          amount: 1000,
          locked: 0,
        },
      },
      transactions: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 1000,
          token: "token_1",
          provider: "HDFC Bank",
        },
      },
    },
    update: {},
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch((err) => {
    throw new Error(err);
  });
