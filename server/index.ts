import express, { Express } from "express";
import dotenv from "dotenv";
import routes from "./routes";
const cors = require("cors")
dotenv.config();

const app: Express = express();
const port = 9000;
app.use(cors())
app.use(routes);

app.listen(port, () => {
  console.log(` Typescript server is running at http://localhost:${port}`);
});
