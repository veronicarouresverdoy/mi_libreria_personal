import Express from 'express';
import path from 'path';
import { publicPath } from '../config/configData.js';
import { newUser } from '../controllers/userController.js';

const router = Express.Router();

router.get('/user', (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/newUser.html");
    res.sendFile(targetFilePath);
  });
  
router.post("/user", async (req: Express.Request, res: Express.Response) => {
    const result = await newUser(req.body);
    res.send(result);
  });

export { router } ;

