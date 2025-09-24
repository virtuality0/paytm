import express from "express";
import dotenv from "dotenv";
import { RouterV1 } from "./router/v1router";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "Server up and running",
  });
});

app.use("/api/v1", RouterV1);

app.listen(process.env.PORT, () => {
  console.info(`Server running on port ${process.env.PORT}`);
});
