import Express from 'express';
import path from 'path';
import { publicPath } from '../config/configData.js';
import { getAllUsers, getUserById, newUser } from '../controllers/userController.js';

const router = Express.Router();

router.get("/users", async (req: Express.Request, res: Express.Response) => {
  const result = await getAllUsers();
  res.send(result);
});

router.get("/users/:id", async (req: Express.Request, res: Express.Response) => {
  const result = await getUserById(req.params.id);
  res.send(result);
});

router.get('/user', (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/newUser.html");
    res.sendFile(targetFilePath);
});
  
router.post("/users", async (req: Express.Request, res: Express.Response) => {
    const result = await newUser(req.body);
    res.send(result);
  });

export { router } ;

