import Express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './configDb.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Express();
const port = 3000;

app.use(Express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, '../public');
app.use(Express.static(publicPath));



app.get('/', (req: Express.Request, res: Express.Response) => {
  const targetFilePath = path.join(publicPath, "/index.html");
  res.sendFile(targetFilePath);
});

app.get('/user', (req: Express.Request, res: Express.Response) => {
  const targetFilePath = path.join(publicPath, "/newUser.html");
  res.sendFile(targetFilePath);
});

app.get("/pagina2", (req: Express.Request, res: Express.Response)=>{
  const targetFilePath = path.join(publicPath, "/pagina2.html");
  res.sendFile(targetFilePath);
});

app.post("/user", async (req: Express.Request, res: Express.Response) => {
  const queryString = `INSERT INTO "user" ("userName", "name", "first_surname", "password", "email") VALUES ('${req.body.username}', '${req.body.name}', '${req.body.surname}', '${req.body.password}','${req.body.email}')`;
  const result = await pool.query(queryString);
  res.send(result.rows);
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});