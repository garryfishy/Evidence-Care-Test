import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './routes'
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(routes)

app.listen(port, () => {
  console.log(` Typescript server is running at http://localhost:${port}`);
});