import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connect } from "./utils/connection";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

async function main() {
  await connect();

  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
}

main();
