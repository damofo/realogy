import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import routes from "./routes";
import { connect } from "./utils/connection";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function main() {
  await connect();

  app.get("/", (req: Request, res: Response) => {
    res.send("Realogy Test Project");
  });

  app.use("/api", routes);

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
}

main();
