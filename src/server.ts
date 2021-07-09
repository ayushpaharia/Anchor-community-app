import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "config";
import morgan from "morgan";
import express, { Response } from "express";

import { authRoutes } from "./routes";
import trim from "./middlewares/trim";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(trim);

const port = config.get("port") as number;
const host = config.get("host") as string;

// Default route
app.get("/", (_, res: Response) => {
  return res.send(`Server listing at http://${host}:${port}/`);
});

// Routes
app.use("/api/auth", authRoutes);

console.clear();
app.listen(port, async () => {
  try {
    await createConnection();
    console.log("Database Connected!");
  } catch (error) {
    console.log(error);
  }
});
