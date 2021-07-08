import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "config";
import morgan from "morgan";
import express, { Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

const port = config.get("port") as number;
const host = config.get("host") as string;

app.get("/", (_, res: Response) => {
  res.send(`Server listing at http://${host}:${port}/`);
});

console.clear();
app.listen(port, async () => {
  try {
    await createConnection();
    console.log("Database Connected!");
  } catch (error) {
    console.log(error);
  }
});
